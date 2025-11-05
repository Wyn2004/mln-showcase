"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import ChatModal from "./ChatModal";

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-amber-700/90 hover:bg-amber-600 text-amber-50 shadow-lg flex items-center justify-center z-40 border-2 border-amber-600/50 backdrop-blur-sm"
        aria-label="Mở chat"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      <ChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

