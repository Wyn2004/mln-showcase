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
        className="border-4 border-gray-400 hover:border-gray-600 font-bold"
      >
        ← Quay Lại Chọn Cấp Độ
      </Button>

      {/* Quick Guide */}
      <Card className="border-4 border-yellow-500 bg-gradient-to-r from-yellow-50 to-amber-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="text-4xl">💡</div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-yellow-800 mb-2">Hướng Dẫn Nhanh:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-xl">👷</span>
                  <div>
                    <strong>Bước 1:</strong> Kéo công nhân từ kho vào 3 máy (tối đa 3 CN/máy)
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xl">⚙️</span>
                  <div>
                    <strong>Bước 2:</strong> Điều chỉnh sliders bên dưới để tăng năng suất
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xl">🎯</span>
                  <div>
                    <strong>Mục tiêu:</strong> Đạt giá trị thặng dư (s) ≥ {gameLevel.targetSurplus} trước khi hết giờ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-8 border-red-600 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
        <CardContent className="p-0">
          <div ref={containerRef} className="w-full flex justify-center bg-slate-900" style={{ minHeight: '600px' }} />
        </CardContent>
      </Card>

      <Card className="border-8 border-blue-600 bg-gradient-to-br from-blue-50 to-cyan-50">
        <CardContent className="p-6 space-y-6">
          <h3 className="text-2xl font-bold text-blue-800">⚙️ Điều Khiển Dây Chuyền</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-gray-700 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Năng Suất (P)
                </label>
                <Badge variant="outline" className="text-lg font-bold">{gameData.productivity.toFixed(1)}x</Badge>
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
              <p className="text-xs text-gray-600">
                💡 <strong>Ảnh hưởng:</strong> Tăng năng suất → Tăng giá trị sản phẩm → Tăng thặng dư (s)
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-gray-700">⏱️ Tỷ Lệ Làm Việc</label>
                <Badge variant="outline" className="text-lg font-bold">{(gameData.workRatio * 100).toFixed(0)}%</Badge>
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
              <p className="text-xs text-gray-600">
                💡 <strong>Ảnh hưởng:</strong> Tăng tỷ lệ làm việc → Tăng sản lượng → Tăng giá trị
              </p>
            </div>
            <div className="space-y-3">
              <label className="font-semibold text-gray-700 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-red-600" />
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
                className="w-full px-4 py-2 border-4 border-red-300 rounded-lg text-lg font-bold"
              />
              <p className="text-xs text-gray-600">
                💡 Chi phí máy móc, nguyên vật liệu (không tạo giá trị mới)
              </p>
            </div>
            <div className="space-y-3">
              <label className="font-semibold text-gray-700 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
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
                className="w-full px-4 py-2 border-4 border-blue-300 rounded-lg text-lg font-bold"
              />
              <p className="text-xs text-gray-600">
                💡 Chi phí tiền lương công nhân (tạo giá trị mới + thặng dư)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-8 border-purple-600 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold text-purple-800 mb-4">📊 Kết Quả Tính Toán</h3>

          {/* Warnings */}
          {outputs.warnings && outputs.warnings.length > 0 && (
            <div className="mb-4 p-4 bg-yellow-100 border-4 border-yellow-500 rounded-lg">
              <h4 className="font-bold text-yellow-800 mb-2">⚠️ Cảnh Báo Hiệu Quả:</h4>
              <ul className="space-y-1 text-sm">
                {outputs.warnings.map((warning, idx) => (
                  <li key={idx} className="text-yellow-900">{warning}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border-4 border-yellow-400">
              <p className="text-sm text-gray-600">Sản Xuất/Giây</p>
              <p className="text-2xl font-bold text-yellow-700">{outputs.outputValue.toFixed(1)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border-4 border-red-400">
              <p className="text-sm text-gray-600">Thặng Dư Tích Lũy (s)</p>
              <p className="text-2xl font-bold text-red-700">{gameData.accumulatedSurplus.toFixed(0)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border-4 border-green-400">
              <p className="text-sm text-gray-600">Tỷ Suất Thặng Dư (m&apos;)</p>
              <p className="text-2xl font-bold text-green-700">{outputs.rateOfSurplusValue.toFixed(1)}%</p>
            </div>
            <div className="bg-white p-4 rounded-lg border-4 border-blue-400">
              <p className="text-sm text-gray-600">Tỷ Suất Lợi Nhuận (p&apos;)</p>
              <p className="text-2xl font-bold text-blue-700">{outputs.rateOfProfit.toFixed(1)}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full border-8 border-yellow-500 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={handleSaveScore}>
                <X className="w-6 h-6" />
              </Button>
              <div className="text-center space-y-6">
                <Award className="w-24 h-24 text-yellow-500 mx-auto" />
                <h2 className="text-4xl font-bold">
                  {gameData.accumulatedSurplus >= gameLevel.targetSurplus ? "🎉 Hoàn Thành!" : "⏰ Hết Giờ!"}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-yellow-100 to-amber-100 p-4 rounded-lg border-4 border-yellow-400">
                    <p className="text-sm text-gray-600">Điểm Số</p>
                    <p className="text-3xl font-bold text-yellow-700">
                      {calculateScore(gameData.accumulatedSurplus, gameLevel.targetSurplus, gameLevel.duration, gameData.timeRemaining, 0, 0)}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-red-100 to-pink-100 p-4 rounded-lg border-4 border-red-400">
                    <p className="text-sm text-gray-600">Giá Trị Thặng Dư</p>
                    <p className="text-3xl font-bold text-red-700">{gameData.accumulatedSurplus.toFixed(0)}</p>
                  </div>
                </div>
                <Button
                  onClick={handleSaveScore}
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-bold text-lg py-6"
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