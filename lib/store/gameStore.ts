import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface GameScore {
  score: number;
  date: string;
  level: number;
}

export interface GameState {
  highScores: GameScore[];
  totalGamesPlayed: number;
  bestScore: number;
  lastSettings: {
    workers: number;
    productivity: number;
    constantCapital: number;
    variableCapital: number;
  };
  addScore: (score: GameScore) => void;
  incrementGamesPlayed: () => void;
  updateLastSettings: (settings: Partial<GameState['lastSettings']>) => void;
  resetScores: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      highScores: [],
      totalGamesPlayed: 0,
      bestScore: 0,
      lastSettings: {
        workers: 3,
        productivity: 1,
        constantCapital: 100,
        variableCapital: 100,
      },
      addScore: (score) =>
        set((state) => {
          const newHighScores = [...state.highScores, score]
            .sort((a, b) => b.score - a.score)
            .slice(0, 10); // Keep top 10
          return {
            highScores: newHighScores,
            bestScore: Math.max(state.bestScore, score.score),
          };
        }),
      incrementGamesPlayed: () =>
        set((state) => ({
          totalGamesPlayed: state.totalGamesPlayed + 1,
        })),
      updateLastSettings: (settings) =>
        set((state) => ({
          lastSettings: { ...state.lastSettings, ...settings },
        })),
      resetScores: () =>
        set({
          highScores: [],
          totalGamesPlayed: 0,
          bestScore: 0,
        }),
    }),
    {
      name: 'factory-shift-game',
    }
  )
);

