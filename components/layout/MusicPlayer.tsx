"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        // Check if audio is ready
        if (audioRef.current && audioRef.current.readyState >= 2) {
            setIsLoading(false);
        }
    }, []);

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play()
                    .then(() => {
                        setIsPlaying(true);
                    })
                    .catch((error) => {
                        console.error("Error playing audio:", error);
                        setIsPlaying(false);
                    });
            }
        }
    };

    const handleCanPlay = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        setIsLoading(false);
        console.error("Error loading audio");
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 2 }}
            className="fixed top-8 right-8 z-50"
        >
            <motion.button
                onClick={handlePlayPause}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative w-16 h-16 rounded-full bg-gradient-to-br from-amber-900/80 to-amber-950 hover:from-amber-900 hover:to-amber-950 shadow-2xl hover:shadow-amber-700/30 flex items-center justify-center group border-2 border-amber-700/40 backdrop-blur-sm"
                disabled={isLoading}
            >
                {/* Animated waves when playing */}
                <AnimatePresence>
                    {isPlaying && (
                        <>
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1.5, opacity: [0, 0.4, 0] }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 rounded-full bg-amber-700/50"
                            />
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1.3, opacity: [0, 0.3, 0] }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                                className="absolute inset-0 rounded-full bg-amber-600/40"
                            />
                        </>
                    )}
                </AnimatePresence>

                {/* Icons with smooth transitions */}
                <motion.div
                    key={isLoading ? "loading" : isPlaying ? "playing" : "paused"}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative z-10"
                >
                    {isLoading ? (
                        <Music className="w-6 h-6 text-amber-200" />
                    ) : isPlaying ? (
                        <Volume2 className="w-7 h-7 text-amber-200" />
                    ) : (
                        <VolumeX className="w-7 h-7 text-amber-200" />
                    )}
                </motion.div>

                {/* Rotating vinyl effect when playing */}
                <AnimatePresence>
                    {isPlaying && (
                        <motion.div
                            initial={{ opacity: 0, rotate: 0 }}
                            animate={{ opacity: 1, rotate: 360 }}
                            exit={{ opacity: 0 }}
                            transition={{ rotate: { duration: 3, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.3 } }}
                            className="absolute inset-2 rounded-full border-2 border-amber-600/30 z-0"
                        />
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Audio element */}
            <audio
                ref={audioRef}
                src="/music/backgroud_music.mp3"
                loop
                preload="auto"
                onCanPlay={handleCanPlay}
                onError={handleError}
            />
        </motion.div>
    );
}
