// Factory Shift Game Logic
// Implements Marxian economics formulas: L, P, D, Q, α and s, m', p'

export interface GameInputs {
    workers: number; // Number of workers (L)
    productivity: number; // Productivity level (P)
    constantCapital: number; // c - constant capital (machines, materials)
    variableCapital: number; // v - variable capital (wages)
    workRatio: number; // Ratio of work time (0-1)
    eventModifier?: number; // Optional: temporary event effect (e.g., 0.5 = +50%, -0.3 = -30%)
}

export interface GameOutputs {
    outputValue: number; // Total value produced
    surplusValue: number; // s - surplus value
    rateOfSurplusValue: number; // m' = s / v
    rateOfProfit: number; // p' = s / (c + v)
    isValid: boolean;
    errors: string[];
    warnings: string[]; // Cảnh báo về hiệu quả
    totalCapital: number;
}

const BASE_OUTPUT = 1.5; // Base output per worker PER SECOND (giảm để tăng độ khó)

export function calculateGameOutputs(inputs: GameInputs): GameOutputs {
    const {
        workers,
        productivity,
        constantCapital,
        variableCapital,
        workRatio,
    } = inputs;
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate inputs
    if (workers <= 0) {
        errors.push("Cần ít nhất 1 công nhân");
    }
    if (productivity <= 0) {
        errors.push("Năng suất phải lớn hơn 0");
    }
    if (constantCapital < 0) {
        errors.push("Tư bản bất biến không thể âm");
    }
    if (variableCapital <= 0) {
        errors.push("Tư bản khả biến phải lớn hơn 0");
    }
    if (workRatio < 0 || workRatio > 1) {
        errors.push("Tỷ lệ làm việc phải từ 0 đến 1");
    }

    // ===== GAME LOGIC VỚI TÍNH CHIẾN THUẬT =====
    // Game yêu cầu người chơi cân bằng nhiều yếu tố:
    // - Số lượng công nhân vs vốn khả biến (v) - cần đủ lương
    // - Số lượng công nhân vs vốn bất biến (c) - cần đủ máy móc
    // - Năng suất cao → penalty khi quá cao
    // - Tỷ lệ làm việc cao → công nhân mệt mỏi
    // - Quá nhiều công nhân → giảm hiệu quả

    // 1. Mỗi công nhân cần tư bản khả biến tối thiểu (tiền lương)
    const minVariableCapitalPerWorker = 30; // Tăng từ 20 → 30 để tăng độ khó
    const requiredVariableCapital = workers * minVariableCapitalPerWorker;

    // Nếu v không đủ, công nhân làm việc kém hiệu quả (giảm từ 70% → 50% minimum)
    const capitalEfficiency =
        variableCapital > 0
            ? Math.max(
                  0.5,
                  Math.min(1, variableCapital / requiredVariableCapital)
              )
            : 0.5;

    if (capitalEfficiency < 0.95) {
        warnings.push(
            `⚠️ Tư bản khả biến (v) thấp! Khuyến nghị: ${requiredVariableCapital}. Hiệu quả: ${(
                capitalEfficiency * 100
            ).toFixed(0)}%`
        );
    }

    // 2. Mỗi công nhân cần máy móc (c) tối thiểu
    const minConstantCapitalPerWorker = 35; // Tăng từ 25 → 35 để tăng độ khó
    const requiredConstantCapital = workers * minConstantCapitalPerWorker;

    // Nếu c không đủ, máy móc quá tải → giảm năng suất (giảm từ 70% → 50% minimum)
    const machineEfficiency =
        constantCapital > 0
            ? Math.max(
                  0.5,
                  Math.min(1, constantCapital / requiredConstantCapital)
              )
            : 0.5;

    if (machineEfficiency < 0.95) {
        warnings.push(
            `⚠️ Tư bản bất biến (c) thấp! Khuyến nghị: ${requiredConstantCapital}. Hiệu quả máy: ${(
                machineEfficiency * 100
            ).toFixed(0)}%`
        );
    }

    // 3. Quá nhiều công nhân → Overcrowding penalty (TĂNG PENALTY)
    const overcrowdingPenalty = 
        workers > 9 ? 0.65 :  // Rất nhiều → -35%
        workers > 7 ? 0.75 :  // Nhiều → -25%
        workers > 6 ? 0.85 :  // Hơi nhiều → -15%
        1.0;

    if (overcrowdingPenalty < 1) {
        warnings.push(
            `⚠️ Quá nhiều công nhân (${workers})! Giảm ${(
                (1 - overcrowdingPenalty) *
                100
            ).toFixed(0)}% hiệu quả`
        );
    }

    // 4. Work ratio quá cao → Công nhân mệt mỏi (TĂNG PENALTY, THÊM NHIỀU THANG)
    const fatigueMultiplier = 
        workRatio > 0.95 ? 0.70 :  // Rất cao → -30%
        workRatio > 0.90 ? 0.80 :  // Cao → -20%
        workRatio > 0.85 ? 0.90 :  // Hơi cao → -10%
        1.0;

    if (fatigueMultiplier < 1) {
        warnings.push(
            `⚠️ Tỷ lệ làm việc rất cao (${(workRatio * 100).toFixed(
                0
            )}%)! Công nhân mệt, giảm ${((1 - fatigueMultiplier) * 100).toFixed(
                0
            )}% năng suất`
        );
    }

    // 5. Năng suất quá cao → Chi phí vận hành tăng, hiệu quả giảm (THÊM MỚI)
    const productivityPenalty = productivity > 3.5 ? 0.85 : productivity > 2.5 ? 0.92 : 1.0;

    if (productivityPenalty < 1) {
        warnings.push(
            `⚠️ Năng suất rất cao (${productivity.toFixed(1)}x)! Máy móc quá tải, giảm ${((1 - productivityPenalty) * 100).toFixed(0)}% hiệu quả`
        );
    }

    // Calculate output value với các hệ số chiến thuật
    const effectiveProductivity = productivity * machineEfficiency * productivityPenalty;
    
    // Apply event modifier if present (bonus or penalty from random events)
    const eventMultiplier = inputs.eventModifier !== undefined ? (1 + inputs.eventModifier) : 1.0;
    
    const outputValue =
        BASE_OUTPUT *
        workers *
        effectiveProductivity *
        workRatio *
        capitalEfficiency *
        overcrowdingPenalty *
        fatigueMultiplier *
        eventMultiplier;

    // Calculate surplus value
    // s = outputValue - v - c
    const surplusValue = outputValue - variableCapital - constantCapital;

    // Calculate rate of surplus value (m')
    // m' = s / v (if v > 0)
    const rateOfSurplusValue =
        variableCapital > 0 ? (surplusValue / variableCapital) * 100 : 0;

    // Calculate rate of profit (p')
    // p' = s / (c + v) (if c + v > 0)
    const totalCapital = constantCapital + variableCapital;
    const rateOfProfit =
        totalCapital > 0 ? (surplusValue / totalCapital) * 100 : 0;

    return {
        outputValue: Math.max(0, outputValue),
        surplusValue: Math.max(0, surplusValue),
        rateOfSurplusValue: Math.max(0, rateOfSurplusValue),
        rateOfProfit: Math.max(0, rateOfProfit),
        isValid: errors.length === 0 && surplusValue >= 0,
        errors,
        warnings,
        totalCapital,
    };
}

export interface GameLevel {
    level: number;
    name: string;
    description: string;
    duration: number; // seconds
    targetSurplus: number;
    targetRate?: number; // m' or p'
    initialWorkers: number;
    initialProductivity: number;
    initialC: number;
    initialV: number;
    maxWorkers: number;
    maxProductivity: number;
}

export const GAME_LEVELS: GameLevel[] = [
    {
        level: 1,
        name: "Khởi Đầu",
        description: "Học cách quản lý dây chuyền cơ bản",
        duration: 120,
        targetSurplus: 150, // Tăng từ 100 → 150
        initialWorkers: 3,
        initialProductivity: 1,
        initialC: 50,
        initialV: 80,
        maxWorkers: 5,
        maxProductivity: 2,
    },
    {
        level: 2,
        name: "Tăng Năng Suất",
        description: "Tối ưu hóa năng suất lao động - Cần cân bằng c, v để tránh penalties",
        duration: 150,
        targetSurplus: 300, // Tăng từ 200 → 300
        targetRate: 150, // m' >= 150%
        initialWorkers: 4,
        initialProductivity: 1.2,
        initialC: 80,
        initialV: 100,
        maxWorkers: 8,
        maxProductivity: 3,
    },
    {
        level: 3,
        name: "Thách Thức",
        description: "Đạt mục tiêu cao với thời gian giới hạn - Chiến thuật tối ưu rất quan trọng!",
        duration: 180,
        targetSurplus: 500, // Tăng từ 350 → 500
        targetRate: 200, // m' >= 200%
        initialWorkers: 5,
        initialProductivity: 1.5,
        initialC: 100,
        initialV: 120,
        maxWorkers: 10,
        maxProductivity: 4,
    },
];

export function calculateScore(
    surplusValue: number,
    targetSurplus: number,
    timeRemaining: number,
    totalTime: number,
    correctActions: number,
    cheats: number
): number {
    let score = 0;

    // Base score from surplus value (avoid division by zero)
    if (targetSurplus > 0) {
        if (surplusValue >= targetSurplus) {
            score += 100;
            // Bonus for exceeding target
            const excess = surplusValue - targetSurplus;
            score += Math.floor(excess / 10);
        } else {
            // Partial credit
            score += Math.floor((Math.max(0, surplusValue) / targetSurplus) * 50);
        }
    } else {
        // Fallback if target is 0
        score += surplusValue > 0 ? 50 : 0;
    }

    // Time bonus (avoid division by zero)
    if (totalTime > 0) {
        const timeRatio = Math.max(0, timeRemaining / totalTime);
        score += Math.floor(timeRatio * 50);
    }

    // Correct actions bonus
    score += correctActions * 10;

    // Cheat penalty
    score -= cheats * 2;

    return Math.max(0, score);
}
