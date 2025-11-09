import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { embedder } from "../embed";
import { supabase } from "../supabase";

export async function getRetriever() {
  const vectorStore = await SupabaseVectorStore.fromExistingIndex(embedder, {
    client: supabase,
    tableName: "documents",
    // Hàm SQL đã tạo trong Supabase
    queryName: "match_documents",
  });

  // Trả về retriever top 5 document
  return vectorStore.asRetriever(5);
}
