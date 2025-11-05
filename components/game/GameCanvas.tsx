"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Award, X } from "lucide-react";
import { calculateGameOutputs, calculateScore, GAME_LEVELS } from "@/lib/game/gameLogic";
import { useGameStore } from "@/lib/store/gameStore";
// Phaser and FactoryScene are dynamically imported at runtime inside useEffect
// to avoid referencing browser-only globals (navigator/window) during SSR.

interface GameCanvasProps {
  level: number;
  onGameEnd: () => void;
  onBack: () => void;
}

export default function GameCanvas({ level, onGameEnd, onBack }: GameCanvasProps) {
  const { addScore, incrementGamesPlayed } = useGameStore();
  const gameLevel = GAME_LEVELS.find((l) => l.level === level) || GAME_LEVELS[0];

  const gameRef = useRef<any | null>(null);
  const sceneRef = useRef<any | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isUserUpdateRef = useRef(false); // Flag to prevent loop between user updates and scene updates

  const [gameData, setGameData] = useState<any>({
    workers: 0,
    productivity: gameLevel.initialProductivity,
    constantCapital: gameLevel.initialC,
    variableCapital: gameLevel.initialV,
    workRatio: 0.8,
    timeRemaining: gameLevel.duration,
    targetSurplus: gameLevel.targetSurplus,
    targetRate: gameLevel.targetRate,
    accumulatedSurplus: 0,
    accumulatedOutput: 0,
  });

  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return;

    let mounted = true;

    (async () => {
      // dynamic import so SSR doesn't evaluate phaser or any navigator-dependent code
      const Phaser = await import('phaser');
      const mod = await import('@/lib/game/FactoryScene');
      const FactoryScene = mod.FactoryScene;

      const createWorkerTexture = (scene: any) => {
        const graphics = scene.make.graphics({ x: 0, y: 0 });
        graphics.fillStyle(0xffd700);
        graphics.fillCircle(25, 25, 25);
        graphics.fillStyle(0x000000);
        graphics.fillCircle(15, 20, 5);
        graphics.fillCircle(35, 20, 5);
        graphics.lineStyle(3, 0x000000);
        graphics.arc(25, 30, 10, 0, Math.PI);
        graphics.strokePath();
        graphics.generateTexture('worker', 50, 50);
        graphics.destroy();
      };

      const createParticleTexture = (scene: any) => {
        const graphics = scene.make.graphics({ x: 0, y: 0 });
        graphics.fillStyle(0xffd700);
        graphics.fillCircle(8, 8, 8);
        graphics.generateTexture('particle', 16, 16);
        graphics.destroy();
      };

      const config: any = {
        type: Phaser.AUTO,
        parent: containerRef.current,
        width: 1000,
        height: 600,
        backgroundColor: '#1a1a2e',
        scene: {
          key: 'FactoryScene',
          create: function (this: any) {
            createWorkerTexture(this);
            createParticleTexture(this);

            const factoryScene = new FactoryScene();
            this.scene.add('Factory', factoryScene, true, {
              gameData: gameData,
              onUpdate: (data: any) => {
                if (!isUserUpdateRef.current) {
                  setGameData(data);
                }
              },
              onGameEnd: () => setShowResult(true),
            });
            this.scene.remove('FactoryScene');
            sceneRef.current = factoryScene;
          }
        },
        physics: {
          default: 'arcade',
          arcade: { gravity: { x: 0, y: 0 }, debug: false },
        },
      };

      if (!mounted) return;
      gameRef.current = new Phaser.Game(config);
    })();

    return () => {
      mounted = false;
      if (gameRef.current) {
        try { gameRef.current.destroy(true); } catch (_) { }
        gameRef.current = null;
      }
    };
  }, []);

  // Sync gameData changes to scene when controls are adjusted
  useEffect(() => {
    if (sceneRef.current && gameRef.current) {
      // Mark as user update to prevent feedback loop
      isUserUpdateRef.current = true;

      // Update scene with latest gameData
      if (typeof sceneRef.current.setProductivity === 'function') {
        sceneRef.current.setProductivity(gameData.productivity);
      }
      if (typeof sceneRef.current.setWorkRatio === 'function') {
        sceneRef.current.setWorkRatio(gameData.workRatio);
      }
      if (typeof sceneRef.current.setConstantCapital === 'function') {
        sceneRef.current.setConstantCapital(gameData.constantCapital);
      }
      if (typeof sceneRef.current.setVariableCapital === 'function') {
        sceneRef.current.setVariableCapital(gameData.variableCapital);
      }

      // Reset flag after a short delay
      setTimeout(() => {
        isUserUpdateRef.current = false;
      }, 100);
    }
  }, [gameData.productivity, gameData.workRatio, gameData.constantCapital, gameData.variableCapital]);

  const handleSaveScore = () => {
    // Use accumulatedSurplus instead of instant surplusValue
    const finalScore = calculateScore(
      gameData.accumulatedSurplus,
      gameLevel.targetSurplus,
      gameLevel.duration,
      gameData.timeRemaining,
      0,
      0
    );

    addScore({
      score: finalScore,
      date: new Date().toISOString(),
      level: level,
    });
    incrementGamesPlayed();
    onGameEnd();
  };

  const outputs = calculateGameOutputs(gameData);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        onClick={onBack}
        variant="outline"
        className="border-2 border-amber-700/50 hover:border-amber-600/80 bg-[#130E07]/60 text-amber-200 hover:text-amber-100 font-bold backdrop-blur-sm"
      >
        ← Quay Lại Chọn Cấp Độ
      </Button>

      {/* Quick Guide */}
      <Card className="border-2 border-amber-700/50 bg-[#130E07]/90 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="text-amber-400 text-2xl md:text-3xl">💡</div>
            <div className="flex-1">
              <h3 className="font-bold text-base md:text-lg text-amber-100 mb-3">Hướng Dẫn Nhanh:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-amber-400">👷</span>
                  <div className="text-amber-200/80">
                    <strong className="text-amber-100">Bước 1:</strong> Kéo công nhân từ kho vào 3 máy (tối đa 3 CN/máy)
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-400">⚙️</span>
                  <div className="text-amber-200/80">
                    <strong className="text-amber-100">Bước 2:</strong> Điều chỉnh sliders bên dưới để tăng năng suất
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-400">🎯</span>
                  <div className="text-amber-200/80">
                    <strong className="text-amber-100">Mục tiêu:</strong> Đạt giá trị thặng dư (s) ≥ {gameLevel.targetSurplus} trước khi hết giờ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-amber-700/50 bg-[#130E07]/90 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0">
          <div ref={containerRef} className="w-full flex justify-center bg-[#1a1a2e]" style={{ minHeight: '600px' }} />
        </CardContent>
      </Card>

      <Card className="border-2 border-amber-700/50 bg-[#130E07]/90 backdrop-blur-sm">
        <CardContent className="p-6 space-y-6">
          <h3 className="text-xl md:text-2xl font-bold text-amber-100">⚙️ Điều Khiển Dây Chuyền</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-amber-200/80 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-amber-400" />
                  Năng Suất (P)
                </label>
                <Badge variant="outline" className="text-base md:text-lg font-bold border-amber-700/50 text-amber-300 bg-[#1a1208]/60">{gameData.productivity.toFixed(1)}x</Badge>
              </div>
              <Slider
                value={[gameData.productivity]}
                onValueChange={(v) => {
                  try {
                    const newValue = v[0];
                    isUserUpdateRef.current = true;
                    setGameData((prev: any) => ({ ...prev, productivity: newValue }));
                    if (sceneRef.current && typeof sceneRef.current.setProductivity === 'function') {
                      sceneRef.current.setProductivity(newValue);
                    }
                    setTimeout(() => { isUserUpdateRef.current = false; }, 50);
                  } catch {
                    // Ignore serialization errors
                  }
                }}
                min={1}
                max={gameLevel.maxProductivity}
                step={0.1}
              />
              <p className="text-xs text-amber-200/70">
                💡 <strong className="text-amber-200/90">Ảnh hưởng:</strong> Tăng năng suất → Tăng giá trị sản phẩm → Tăng thặng dư (s)
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-amber-200/80">⏱️ Tỷ Lệ Làm Việc</label>
                <Badge variant="outline" className="text-base md:text-lg font-bold border-amber-700/50 text-amber-300 bg-[#1a1208]/60">{(gameData.workRatio * 100).toFixed(0)}%</Badge>
              </div>
              <Slider
                value={[gameData.workRatio * 100]}
                onValueChange={(v) => {
                  try {
                    const newValue = v[0] / 100;
                    isUserUpdateRef.current = true;
                    setGameData((prev: any) => ({ ...prev, workRatio: newValue }));
                    if (sceneRef.current && typeof sceneRef.current.setWorkRatio === 'function') {
                      sceneRef.current.setWorkRatio(newValue);
                    }
                    setTimeout(() => { isUserUpdateRef.current = false; }, 50);
                  } catch {
                    // Ignore serialization errors
                  }
                }}
                min={0}
                max={100}
                step={5}
              />
              <p className="text-xs text-amber-200/70">
                💡 <strong className="text-amber-200/90">Ảnh hưởng:</strong> Tăng tỷ lệ làm việc → Tăng sản lượng → Tăng giá trị
              </p>
            </div>
            <div className="space-y-3">
              <label className="font-semibold text-amber-200/80 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-amber-400" />
                Tư Bản Bất Biến (c)
              </label>
              <input
                type="number"
                value={gameData.constantCapital}
                onChange={(e) => {
                  try {
                    const v = parseFloat(e.target.value) || 0;
                    isUserUpdateRef.current = true;
                    setGameData((prev: any) => ({ ...prev, constantCapital: v }));
                    if (sceneRef.current && typeof sceneRef.current.setConstantCapital === 'function') {
                      sceneRef.current.setConstantCapital(v);
                    }
                    setTimeout(() => { isUserUpdateRef.current = false; }, 50);
                  } catch {
                    // Ignore serialization errors
                  }
                }}
                className="w-full px-4 py-2 border-2 border-amber-700/50 rounded-lg text-base md:text-lg font-bold bg-[#1a1208]/60 text-amber-100 focus:border-amber-600 focus:outline-none"
              />
              <p className="text-xs text-amber-200/70">
                💡 Chi phí máy móc, nguyên vật liệu (không tạo giá trị mới)
              </p>
            </div>
            <div className="space-y-3">
              <label className="font-semibold text-amber-200/80 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-amber-400" />
                Tư Bản Khả Biến (v)
              </label>
              <input
                type="number"
                value={gameData.variableCapital}
                onChange={(e) => {
                  try {
                    const v = parseFloat(e.target.value) || 0;
                    isUserUpdateRef.current = true;
                    setGameData((prev: any) => ({ ...prev, variableCapital: v }));
                    if (sceneRef.current && typeof sceneRef.current.setVariableCapital === 'function') {
                      sceneRef.current.setVariableCapital(v);
                    }
                    setTimeout(() => { isUserUpdateRef.current = false; }, 50);
                  } catch {
                    // Ignore serialization errors
                  }
                }}
                className="w-full px-4 py-2 border-2 border-amber-700/50 rounded-lg text-base md:text-lg font-bold bg-[#1a1208]/60 text-amber-100 focus:border-amber-600 focus:outline-none"
              />
              <p className="text-xs text-amber-200/70">
                💡 Chi phí tiền lương công nhân (tạo giá trị mới + thặng dư)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-amber-700/50 bg-[#130E07]/90 backdrop-blur-sm">
        <CardContent className="p-6">
          <h3 className="text-xl md:text-2xl font-bold text-amber-100 mb-4">📊 Kết Quả Tính Toán</h3>

          {/* Warnings */}
          {outputs.warnings && outputs.warnings.length > 0 && (
            <div className="mb-4 p-4 bg-amber-900/40 border-2 border-amber-600/50 rounded-lg">
              <h4 className="font-bold text-amber-200 mb-2">⚠️ Cảnh Báo Hiệu Quả:</h4>
              <ul className="space-y-1 text-sm text-amber-200/80">
                {outputs.warnings.map((warning, idx) => (
                  <li key={idx}>{warning}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#1a1208]/60 p-4 rounded-lg border-2 border-amber-700/50">
              <p className="text-xs md:text-sm text-amber-200/70">Sản Xuất/Giây</p>
              <p className="text-xl md:text-2xl font-bold text-amber-400">{outputs.outputValue.toFixed(1)}</p>
            </div>
            <div className="bg-[#1a1208]/60 p-4 rounded-lg border-2 border-amber-700/50">
              <p className="text-xs md:text-sm text-amber-200/70">Thặng Dư Tích Lũy (s)</p>
              <p className="text-xl md:text-2xl font-bold text-amber-400">{gameData.accumulatedSurplus.toFixed(0)}</p>
            </div>
            <div className="bg-[#1a1208]/60 p-4 rounded-lg border-2 border-amber-700/50">
              <p className="text-xs md:text-sm text-amber-200/70">Tỷ Suất Thặng Dư (m&apos;)</p>
              <p className="text-xl md:text-2xl font-bold text-amber-400">{outputs.rateOfSurplusValue.toFixed(1)}%</p>
            </div>
            <div className="bg-[#1a1208]/60 p-4 rounded-lg border-2 border-amber-700/50">
              <p className="text-xs md:text-sm text-amber-200/70">Tỷ Suất Lợi Nhuận (p&apos;)</p>
              <p className="text-xl md:text-2xl font-bold text-amber-400">{outputs.rateOfProfit.toFixed(1)}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-[#130E07]/95 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-2xl w-full border-2 border-amber-700/50 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-amber-200 hover:text-amber-100 hover:bg-amber-800/40" onClick={handleSaveScore}>
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </Button>
              <div className="text-center space-y-6">
                <Award className="w-16 h-16 md:w-24 md:h-24 text-amber-400 mx-auto" />
                <h2 className="text-2xl md:text-4xl font-bold text-amber-100">
                  {gameData.accumulatedSurplus >= gameLevel.targetSurplus ? "🎉 Hoàn Thành!" : "⏰ Hết Giờ!"}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1a1208]/60 p-4 rounded-lg border-2 border-amber-700/50">
                    <p className="text-xs md:text-sm text-amber-200/70">Điểm Số</p>
                    <p className="text-2xl md:text-3xl font-bold text-amber-400">
                      {calculateScore(gameData.accumulatedSurplus, gameLevel.targetSurplus, gameLevel.duration, gameData.timeRemaining, 0, 0)}
                    </p>
                  </div>
                  <div className="bg-[#1a1208]/60 p-4 rounded-lg border-2 border-amber-700/50">
                    <p className="text-xs md:text-sm text-amber-200/70">Giá Trị Thặng Dư</p>
                    <p className="text-2xl md:text-3xl font-bold text-amber-400">{gameData.accumulatedSurplus.toFixed(0)}</p>
                  </div>
                </div>
                <Button
                  onClick={handleSaveScore}
                  className="w-full bg-amber-700/80 hover:bg-amber-600 text-amber-50 font-bold text-base md:text-lg py-4 md:py-6"
                >
                  Lưu Điểm & Thoát
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}