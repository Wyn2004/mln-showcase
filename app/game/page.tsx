"use client";

import { useState } from "react";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-red-600 to-red-700 border-b-4 border-red-800 shadow-2xl"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-full p-4">
              <Factory className="w-12 h-12 text-red-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white" style={{ fontFamily: "serif" }}>
                Factory Shift
              </h1>
              <p className="text-red-100 text-lg font-medium">
                Dây Chuyền Sản Xuất - Học Giá Trị Thặng Dư
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800 border-4 border-red-600 h-auto p-2">
            <TabsTrigger
              value="play"
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white font-bold text-lg py-3"
            >
              <Play className="w-5 h-5 mr-2" />
              Chơi Game
            </TabsTrigger>
            <TabsTrigger
              value="tutorial"
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white font-bold text-lg py-3"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Hướng Dẫn
            </TabsTrigger>
            <TabsTrigger
              value="leaderboard"
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white font-bold text-lg py-3"
            >
              <Trophy className="w-5 h-5 mr-2" />
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
                <Card className="border-8 border-red-600 bg-gradient-to-br from-amber-50 to-orange-50">
                  <CardHeader>
                    <CardTitle className="text-3xl text-red-800" style={{ fontFamily: "serif" }}>
                      Chọn Cấp Độ
                    </CardTitle>
                    <CardDescription className="text-lg">
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
                          className="border-4 border-red-400 hover:border-red-600 cursor-pointer transition-all"
                          onClick={() => handleStartGame(level.level)}
                        >
                          <CardHeader>
                            <CardTitle className="text-xl text-red-700">
                              Cấp {level.level}: {level.name}
                            </CardTitle>
                            <CardDescription>{level.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">Thời gian:</span>
                              <span className="text-red-600 font-bold">{level.duration}s</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">Mục tiêu s:</span>
                              <span className="text-red-600 font-bold">{level.targetSurplus}</span>
                            </div>
                            {level.targetRate && (
                              <div className="flex justify-between text-sm">
                                <span className="font-medium">Mục tiêu m':</span>
                                <span className="text-red-600 font-bold">{level.targetRate}%</span>
                              </div>
                            )}
                            <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">
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

