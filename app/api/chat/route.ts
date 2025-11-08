import { embedder } from "@/lib/embed";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    if (!question || question.trim().length === 0) {
      return NextResponse.json({ error: "Thiếu câu hỏi!" }, { status: 400 });
    }
    // 2. Tìm context trong Supabase
    const { data: matches, error } = await supabase.rpc("match_documents", {
      query_embedding: embedder,
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

    const systemPrompt = `
    Bạn là **trợ lý ảo thông minh chuyên về Kinh tế Chính trị Mác - Lênin**.
    Nhiệm vụ của bạn là giải thích, phân tích và hướng dẫn sinh viên hiểu các khái niệm, quy luật, phạm trù kinh tế trong học thuyết Mác – Lênin.
    - Trả lời ngắn gọn, rõ ràng, đúng trọng tâm.
    - Nếu không có thông tin trong ngữ cảnh, trả lời “Tôi chưa có dữ liệu về phần này.”
    - Không tự bịa thông tin.
    - Giữ văn phong học thuật, dễ hiểu, dùng tiếng Việt chuẩn.
    `;

    const userPrompt = `
    Context từ tài liệu:
    ${context}

    Câu hỏi của sinh viên:
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
