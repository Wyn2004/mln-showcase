"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Factory, Trophy, BookOpen, Play } from "lucide-react";
import GameCanvas from "@/components/game/GameCanvas"
import Tutorial from "@/components/game/Tutorial";
import Leaderboard from "@/components/game/Leaderboard";
import { GAME_LEVELS } from "@/lib/game/gameLogic";

export default function GamePage() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("play");

  const handleStartGame = (level: number) => {
    setSelectedLevel(level);
    setActiveTab("play");
  };

  const handleGameEnd = () => {
    setSelectedLevel(null);
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto relative overflow-hidden">
      {/* Background with image - applied to full page */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/backgroud/bg.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Dark overlay to darken the background */}
        <div className="absolute inset-0 bg-black/70" />
        {/* Additional vignette effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className=" border-b-2 border-amber-700/50 shadow-2xl"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="bg-[#130E07]/80 rounded-full p-3 border-2 border-amber-600/50">
              <Factory className="w-10 h-10 text-amber-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-amber-100" style={{ fontFamily: "serif" }}>
                Factory Shift
              </h1>
              <p className="text-amber-200/80 text-base md:text-lg font-medium">
                Dây Chuyền Sản Xuất - Học Giá Trị Thặng Dư
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-[#130E07]/90 backdrop-blur-sm border-2 border-amber-700/50 h-auto p-1">
            <TabsTrigger
              value="play"
              className="data-[state=active]:bg-amber-700/80 data-[state=active]:text-amber-50 data-[state=inactive]:text-amber-300/70 font-bold text-base md:text-lg py-2 md:py-3"
            >
              <Play className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Chơi Game
            </TabsTrigger>
            <TabsTrigger
              value="tutorial"
              className="data-[state=active]:bg-amber-700/80 data-[state=active]:text-amber-50 data-[state=inactive]:text-amber-300/70 font-bold text-base md:text-lg py-2 md:py-3"
            >
              <BookOpen className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Hướng Dẫn
            </TabsTrigger>
            <TabsTrigger
              value="leaderboard"
              className="data-[state=active]:bg-amber-700/80 data-[state=active]:text-amber-50 data-[state=inactive]:text-amber-300/70 font-bold text-base md:text-lg py-2 md:py-3"
            >
              <Trophy className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Bảng Xếp Hạng
            </TabsTrigger>
          </TabsList>

          {/* Play Tab */}
          <TabsContent value="play" className="space-y-6">
            {selectedLevel === null ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <Card className="border-2 border-amber-700/50 bg-[#130E07]/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl text-amber-100" style={{ fontFamily: "serif" }}>
                      Chọn Cấp Độ
                    </CardTitle>
                    <CardDescription className="text-amber-200/80 text-base md:text-lg">
                      Chọn một cấp độ để bắt đầu quản lý dây chuyền sản xuất
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {GAME_LEVELS.map((level) => (
                      <motion.div
                        key={level.level}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Card
                          className="border-2 border-amber-700/30 hover:border-amber-600/60 bg-[#1a1208]/60 backdrop-blur-sm cursor-pointer transition-all"
                          onClick={() => handleStartGame(level.level)}
                        >
                          <CardHeader>
                            <CardTitle className="text-lg md:text-xl text-amber-100">
                              Cấp {level.level}: {level.name}
                            </CardTitle>
                            <CardDescription className="text-amber-200/70">{level.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium text-amber-200/80">Thời gian:</span>
                              <span className="text-amber-400 font-bold">{level.duration}s</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="font-medium text-amber-200/80">Mục tiêu s:</span>
                              <span className="text-amber-400 font-bold">{level.targetSurplus}</span>
                            </div>
                            {level.targetRate && (
                              <div className="flex justify-between text-sm">
                                <span className="font-medium text-amber-200/80">Mục tiêu m':</span>
                                <span className="text-amber-400 font-bold">{level.targetRate}%</span>
                              </div>
                            )}
                            <Button className="w-full mt-4 bg-amber-700/80 hover:bg-amber-600 text-amber-50">
                              Bắt Đầu
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <GameCanvas
                level={selectedLevel}
                onGameEnd={handleGameEnd}
                onBack={() => setSelectedLevel(null)}
              />
            )}
          </TabsContent>

          {/* Tutorial Tab */}
          <TabsContent value="tutorial">
            <Tutorial />
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard">
            <Leaderboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

