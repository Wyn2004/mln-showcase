import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

export const embedder = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "text-embedding-004",
});

// import { OpenAIEmbeddings } from "@langchain/openai";

// export const embedder = new OpenAIEmbeddings({
//   apiKey: process.env.OPENAI_API_KEY!,
//   model: "text-embedding-3-large",
// });
