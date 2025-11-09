import { embedder } from "@/lib/embed";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export function buildPrompt(
  context: string,
  history: Array<{ role: string; content: string }>,
  question: string
) {
  const his = history
    ?.map((m) => `${m.role === "user" ? "Người dùng" : "Trợ lý"}: ${m.content}`)
    .join("\n");

  return `
🎓 Vai trò:
Bạn là **trợ lý ảo thông minh, thân thiện và học thuật**,
chuyên giải thích các khái niệm, quy luật, phạm trù trong **Kinh tế Chính trị Mác – Lênin**.
Bạn có khả năng diễn đạt tự nhiên, mạch lạc và giàu cảm xúc, giúp sinh viên hiểu sâu vấn đề.

Phong cách:
- Viết bằng **tiếng Việt chuẩn, học thuật nhưng dễ hiểu**.
- Có thể **nhấn mạnh** bằng cách sử dụng các dấu như **in đậm**, *nghiêng*, hoặc liệt kê rõ ràng.
- Nếu nội dung dài, hãy chia nhỏ từng ý, đảm bảo đủ và dễ theo dõi.
- Giữ **tôn trọng và thiện chí**, ngay cả khi người dùng hỏi ngoài lề.

Quy tắc nội dung:
1. Luôn dựa vào **CONTEXT** được cung cấp để trả lời.  
2. Nếu câu hỏi **liên quan** đến Kinh tế Chính trị Mác – Lênin:
   - Giải thích kỹ, có ví dụ minh họa.
   - Kết nối câu trả lời với thực tiễn (nếu phù hợp).
3. Nếu câu hỏi **ngoài phạm vi**, hãy:
   - Trả lời ngắn gọn, lịch sự (có thể 1–2 câu thú vị hoặc định hướng học tập),
   - Sau đó gợi ý quay lại đúng chủ đề, ví dụ:
     > “Câu hỏi này khá thú vị! Tuy nhiên, lĩnh vực đó nằm ngoài phạm vi Kinh tế Chính trị Mác – Lênin. Bạn muốn mình giải thích về khía cạnh kinh tế - xã hội tương ứng không?”

🧩 Dữ liệu cuộc trò chuyện trước:
${his ? his + "\n" : "(chưa có)"}

CONTEXT từ tài liệu:
${context}

CÂU HỎI MỚI:
${question}
  `.trim();
}

export async function POST(req: Request) {
  try {
    const { question, history = [] } = await req.json();

    if (!question?.trim()) {
      return NextResponse.json({ error: "Thiếu câu hỏi!" }, { status: 400 });
    }

    //Lấy embedding cho câu hỏi
    const questionEmbedding = await embedder.embedQuery(question);

    // Tìm context trong Supabase (CHÚ Ý: stringify embedding)
    const { data: matches, error } = await supabase.rpc("match_documents", {
      query_embedding: JSON.stringify(questionEmbedding),
      match_count: 5,
    });

    if (error) {
      console.error("Supabase RPC error:", error);
      return NextResponse.json(
        { error: "Lỗi khi truy vấn cơ sở dữ liệu" },
        { status: 500 }
      );
    }

    if (!matches?.length) {
      return NextResponse.json({
        answer:
          "Xin lỗi, tôi không tìm thấy thông tin phù hợp trong tài liệu về Kinh tế Chính trị Mác - Lênin.",
      });
    }

    // Ghép context
    const context = matches
      .map((m: { content: string }) => (m?.content ?? "").trim())
      .filter(Boolean)
      .join("\n---\n");

    // 4) Build prompt gộp (system + user)
    const prompt = buildPrompt(context, history, question);

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Gemini API error:", text);
      return NextResponse.json(
        { error: "Lỗi khi gọi AI API" },
        { status: 500 }
      );
    }

    const json = await res.json();
    const answer =
      json?.candidates?.[0]?.content?.parts
        ?.map((p: { text: string }) => p?.text)
        .join("\n")
        .trim() ||
      "Xin lỗi, tôi không thể tạo câu trả lời lúc này. Vui lòng thử lại.";

    return NextResponse.json({
      answer,
      contextSnippet: context.slice(0, 500),
    });
  } catch (e) {
    console.error("Server error:", e);
    return NextResponse.json({ error: "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}
