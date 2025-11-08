import { openDB } from "idb";

const DB_NAME = "rag_chat_db";
const STORE_NAME = "chat_history";

export interface ChatMessage {
  id?: number;
  sessionId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
}

// Lưu message mới
export async function saveMessage(message: ChatMessage) {
  const db = await getDB();
  await db.add(STORE_NAME, {
    ...message,
    createdAt: new Date().toISOString(),
  });
}

// Lấy lại lịch sử chat theo session
export async function getMessages(sessionId: string) {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const all = await store.getAll();
  return all.filter((m) => m.sessionId === sessionId);
}

// Xóa session
export async function clearSession(sessionId: string) {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  const all = await store.getAll();
  for (const m of all) {
    if (m.sessionId === sessionId) store.delete(m.id);
  }
}
