"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Trash2, TrendingUp } from "lucide-react";
import { useGameStore } from "@/lib/store/gameStore";

export default function Leaderboard() {
  const { highScores, totalGamesPlayed, bestScore, resetScores } = useGameStore();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getMedalIcon = (index: number) => {
    if (index === 0) return <Trophy className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />;
    if (index === 1) return <Medal className="w-5 h-5 md:w-6 md:h-6 text-amber-300" />;
    if (index === 2) return <Award className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />;
    return <span className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center font-bold text-amber-200/60">#{index + 1}</span>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-2 border-amber-700/50 bg-[#130E07]/90 backdrop-blur-sm">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 md:w-12 md:h-12 text-amber-400" />
              <div>
                <p className="text-xs md:text-sm text-amber-200/70">Điểm Cao Nhất</p>
                <p className="text-2xl md:text-3xl font-bold text-amber-300">{bestScore}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-amber-700/50 bg-[#130E07]/90 backdrop-blur-sm">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 md:w-12 md:h-12 text-amber-400" />
              <div>
                <p className="text-xs md:text-sm text-amber-200/70">Tổng Số Trận</p>
                <p className="text-2xl md:text-3xl font-bold text-amber-300">{totalGamesPlayed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-amber-700/50 bg-[#130E07]/90 backdrop-blur-sm">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 md:w-12 md:h-12 text-amber-400" />
              <div>
                <p className="text-xs md:text-sm text-amber-200/70">Top Scores</p>
                <p className="text-2xl md:text-3xl font-bold text-amber-300">{highScores.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard Table */}
      <Card className="border-2 border-amber-700/50 bg-[#130E07]/90 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <CardTitle className="text-2xl md:text-3xl text-amber-100 flex items-center gap-3">
              <Trophy className="w-6 h-6 md:w-8 md:h-8" />
              Bảng Xếp Hạng
            </CardTitle>
            {highScores.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={resetScores}
                className="flex items-center gap-2 bg-amber-800/60 hover:bg-amber-700/80 text-amber-100 border-amber-700/50"
              >
                <Trash2 className="w-4 h-4" />
                Xóa Tất Cả
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {highScores.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="w-12 h-12 md:w-16 md:h-16 text-amber-400/50 mx-auto mb-4" />
              <p className="text-lg md:text-xl text-amber-200/80 font-medium">
                Chưa có điểm số nào
              </p>
              <p className="text-sm text-amber-200/60 mt-2">
                Chơi game để ghi điểm vào bảng xếp hạng!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {highScores.map((score, index) => (
                <motion.div
                  key={`${score.date}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`
                    bg-[#1a1208]/60 p-4 rounded-lg border-2 flex items-center gap-4 backdrop-blur-sm
                    ${index === 0 ? "border-amber-500/80 shadow-lg" : ""}
                    ${index === 1 ? "border-amber-700/40" : ""}
                    ${index === 2 ? "border-amber-600/50" : ""}
                    ${index > 2 ? "border-amber-700/30" : ""}
                  `}
                >
                  {/* Rank */}
                  <div className="flex-shrink-0">
                    {getMedalIcon(index)}
                  </div>

                  {/* Score Info */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div>
                      <p className="text-xs md:text-sm text-amber-200/70">Điểm Số</p>
                      <p className="text-xl md:text-2xl font-bold text-amber-300">{score.score}</p>
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-amber-200/70">Cấp Độ</p>
                      <Badge variant="outline" className="text-sm md:text-base font-bold border-amber-700/50 text-amber-300 bg-[#130E07]/60">
                        Level {score.level}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-amber-200/70">Thời Gian</p>
                      <p className="text-xs md:text-sm font-medium text-amber-200/80">
                        {formatDate(score.date)}
                      </p>
                    </div>
                  </div>

                  {/* Medal Badge for Top 3 */}
                  {index < 3 && (
                    <div className="flex-shrink-0">
                      <Badge
                        className={`
                          ${index === 0 ? "bg-amber-500/80 text-amber-50" : ""}
                          ${index === 1 ? "bg-amber-700/60 text-amber-100" : ""}
                          ${index === 2 ? "bg-amber-600/70 text-amber-100" : ""}
                        `}
                      >
                        Top {index + 1}
                      </Badge>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Achievement Hints */}
      {highScores.length > 0 && (
        <Card className="border-2 border-amber-700/50 bg-[#130E07]/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-amber-100">🎯 Thành Tích</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#1a1208]/60 rounded-lg border-2 border-amber-700/30">
              <span className="font-medium text-amber-200/80">Người Mới</span>
              <Badge variant={totalGamesPlayed >= 1 ? "default" : "outline"} className={totalGamesPlayed >= 1 ? "bg-amber-700/80 text-amber-50" : "border-amber-700/50 text-amber-300"}>
                {totalGamesPlayed >= 1 ? "✓ Hoàn Thành" : "Chơi 1 trận"}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#1a1208]/60 rounded-lg border-2 border-amber-700/30">
              <span className="font-medium text-amber-200/80">Người Chơi Thường Xuyên</span>
              <Badge variant={totalGamesPlayed >= 10 ? "default" : "outline"} className={totalGamesPlayed >= 10 ? "bg-amber-700/80 text-amber-50" : "border-amber-700/50 text-amber-300"}>
                {totalGamesPlayed >= 10 ? "✓ Hoàn Thành" : `${totalGamesPlayed}/10 trận`}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#1a1208]/60 rounded-lg border-2 border-amber-700/30">
              <span className="font-medium text-amber-200/80">Cao Thủ</span>
              <Badge variant={bestScore >= 200 ? "default" : "outline"} className={bestScore >= 200 ? "bg-amber-700/80 text-amber-50" : "border-amber-700/50 text-amber-300"}>
                {bestScore >= 200 ? "✓ Hoàn Thành" : `${bestScore}/200 điểm`}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#1a1208]/60 rounded-lg border-2 border-amber-700/30">
              <span className="font-medium text-amber-200/80">Huyền Thoại</span>
              <Badge variant={bestScore >= 300 ? "default" : "outline"} className={bestScore >= 300 ? "bg-amber-700/80 text-amber-50" : "border-amber-700/50 text-amber-300"}>
                {bestScore >= 300 ? "✓ Hoàn Thành" : `${bestScore}/300 điểm`}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}

