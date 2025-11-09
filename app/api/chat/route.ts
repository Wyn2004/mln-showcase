import { embedder } from "@/lib/embed";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

const ALLOWED_TOPICS = [
  "kinh tế",
  "chính trị",
  "mác",
  "lênin",
  "marx",
  "lenin",
  "giá trị",
  "hàng hóa",
  "lao động",
  "tư bản",
  "chủ nghĩa",
  "xã hội",
  "giai cấp",
  "sản xuất",
  "thặng dư",
  "công nhân",
  "tư sản",
  "phân phối",
  "thu nhập",
  "thị trường",
  "tiền tệ",
];

function isRelevantQuestion(question: string): boolean {
  const lowerQuestion = question.toLowerCase();
  return ALLOWED_TOPICS.some((topic) => lowerQuestion.includes(topic));
}

export async function POST(req: Request) {
  try {
    const { question, history = [] } = await req.json();

    if (!question || question.trim().length === 0) {
      return NextResponse.json({ error: "Thiếu câu hỏi!" }, { status: 400 });
    }

    // Kiểm tra câu hỏi có liên quan đến các chủ đề cho phép
    if (!isRelevantQuestion(question)) {
      return NextResponse.json({
        answer:
          "Xin lỗi, tôi chỉ có thể trả lời các câu hỏi liên quan đến Kinh tế Chính trị Mác - Lênin. Vui lòng đặt câu hỏi về các chủ đề như: giá trị, hàng hóa, lao động, tư bản, chủ nghĩa, giai cấp, sản xuất, thặng dư, phân phối thu nhập...",
      });
    }

    // Tìm context trong Supabase
    const questionEmbedding = await embedder.embedQuery(question);
    const { data: matches, error } = await supabase.rpc("match_documents", {
      query_embedding: questionEmbedding,
      match_count: 5,
    });

    if (error) {
      console.error("Lỗi truy vấn Supabase:", error);
      return NextResponse.json(
        { error: "Lỗi khi truy vấn cơ sở dữ liệu" },
        { status: 500 }
      );
    }

    if (!matches || matches.length === 0) {
      return NextResponse.json({
        answer: "Xin lỗi, tôi không tìm thấy thông tin phù hợp trong tài liệu.",
      });
    }

    const context = matches
      .map((m: { content: string }) => m.content)
      .join("\n");

    // Xây dựng lịch sử chat để AI nhớ ngữ cảnh
    const conversationHistory = history
      .map(
        (msg: { role: string; content: string }) =>
          `${msg.role === "user" ? "Người dùng" : "Trợ lý"}: ${msg.content}`
      )
      .join("\n");

    const systemPrompt = `
    Bạn là **trợ lý ảo thông minh chuyên về Kinh tế Chính trị Mác - Lênin**.
    Nhiệm vụ của bạn là giải thích, phân tích và hướng dẫn sinh viên hiểu các khái niệm, quy luật, phạm trù kinh tế trong học thuyết Mác – Lênin.
    - Trả lời ngắn gọn, rõ ràng, đúng trọng tâm.
    - Nếu không có thông tin trong ngữ cảnh, trả lời "Tôi chưa có dữ liệu về phần này."
    - Không tự bịa thông tin.
    - Giữ văn phong học thuật, dễ hiểu, dùng tiếng Việt chuẩn.
    - Sử dụng lịch sử cuộc trò chuyện để hiểu ngữ cảnh tốt hơn.
    `;

    const userPrompt = `
    ${
      conversationHistory
        ? `Lịch sử cuộc trò chuyện trước:\n${conversationHistory}\n\n`
        : ""
    }Context từ tài liệu:
    ${context}

    Câu hỏi mới của sinh viên:
    ${question}
    `;

    // 3. Gọi Gemini API để tạo câu trả lời
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GOOGLE_API_KEY}`,
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: systemPrompt }, { text: userPrompt }],
            },
          ],
        }),
      }
    );

    if (!res.ok) {
      console.error("Lỗi khi gọi Gemini API:", await res.text());
      return NextResponse.json({ error: "Gemini API lỗi" }, { status: 500 });
    }

    const json = await res.json();
    const answer =
      json?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Tôi chưa có dữ liệu phù hợp để trả lời câu hỏi này.";

    return NextResponse.json({
      answer,
      contextSnippet: context.slice(0, 500),
    });
  } catch (error) {
    console.error("Lỗi trong API chat:", error);
    return NextResponse.json({ error: "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}
