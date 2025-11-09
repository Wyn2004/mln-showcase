"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import ChatInterface from "./ChatInterface";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
  // Lock body scroll when modal is open
  useBodyScrollLock(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-linear-to-br from-[#0a0604] via-[#130E07] to-[#0a0604] rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border-2 border-amber-700/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-amber-400 hover:text-amber-300 hover:bg-amber-900/30 rounded-full"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Chat Interface */}
            <ChatInterface />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
