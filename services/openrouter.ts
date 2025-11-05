// OpenRouter API Service
const OPENROUTER_API_KEY = "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";
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
  }>;
  error?: {
    message: string;
  };
}

export async function sendChatMessage(
  messages: ChatMessage[],
  model: string = "google/gemini-2.0-flash-exp:free"
): Promise<string> {
  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": typeof window !== "undefined" ? window.location.origin : "",
        "X-Title": "MLN Showcase",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
    }

    const data: ChatResponse = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    return data.choices[0]?.message?.content || "Không có phản hồi từ AI.";
  } catch (error) {
    console.error("Error sending chat message:", error);
    throw error;
  }
}

