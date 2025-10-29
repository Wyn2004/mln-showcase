// Economic statistics utilities for the learning website
// Includes: Lorenz curve, discrete Gini, income shares, and Marxian surplus metrics

export type LorenzPoint = { populationShare: number; incomeShare: number };

export function sanitizeIncomes(raw: Array<number | string>): number[] {
  return raw
    .map((v) => (typeof v === "string" ? Number(v) : v))
    .filter((v) => Number.isFinite(v) && v >= 0)
    .map((v) => Number(v));
}

export function computeTotals(incomes: number[]) {
  const totalIncome = incomes.reduce((s, x) => s + x, 0);
  return { totalIncome };
}

// O(n log n) due to sorting; the formula part is O(n)
// Gini discrete: 1 - (2 / (n * μ)) * sum_{i=1..n} (n - i + 0.5) * x_i_sorted / n
// We use the common equivalent: G = (2 * sum(i * x_i)) / (n * sum x) - (n + 1) / n
export function computeGini(incomesInput: number[]): number {
  const incomes = sanitizeIncomes(incomesInput);
  const n = incomes.length;
  if (n === 0) return 0;
  const sorted = [...incomes].sort((a, b) => a - b);
  const total = sorted.reduce((s, x) => s + x, 0);
  if (total === 0) return 0;
  let weightedSum = 0;
  for (let i = 0; i < n; i++) {
    weightedSum += (i + 1) * sorted[i];
  }
  const g = (2 * weightedSum) / (n * total) - (n + 1) / n;
  return Math.max(0, Math.min(1, g));
}

export function computeLorenz(incomesInput: number[]): LorenzPoint[] {
  const incomes = sanitizeIncomes(incomesInput);
  const n = incomes.length;
  if (n === 0)
    return [
      { populationShare: 0, incomeShare: 0 },
      { populationShare: 1, incomeShare: 1 },
    ];
  const sorted = [...incomes].sort((a, b) => a - b);
  const total = sorted.reduce((s, x) => s + x, 0);
  let cumulative = 0;
  const points: LorenzPoint[] = [{ populationShare: 0, incomeShare: 0 }];
  sorted.forEach((x, i) => {
    cumulative += x;
    points.push({
      populationShare: (i + 1) / n,
      incomeShare: total === 0 ? 0 : cumulative / total,
    });
  });
  return points;
}

export function computeShares(incomesInput: number[]) {
  const incomes = sanitizeIncomes(incomesInput);
  const n = incomes.length;
  if (n === 0) return { top10: 0, bottom40: 0 };
  const sorted = [...incomes].sort((a, b) => a - b);
  const total = sorted.reduce((s, x) => s + x, 0);
  if (total === 0) return { top10: 0, bottom40: 0 };
  const topCount = Math.max(1, Math.floor(n * 0.1));
  const bottomCount = Math.max(1, Math.floor(n * 0.4));
  const topSum = sorted.slice(n - topCount).reduce((s, x) => s + x, 0);
  const bottomSum = sorted.slice(0, bottomCount).reduce((s, x) => s + x, 0);
  return { top10: topSum / total, bottom40: bottomSum / total };
}

export function groupByQuantiles(
  incomesInput: number[],
  groups: 5 | 10 = 10
): { label: string; value: number; share: number }[] {
  const incomes = sanitizeIncomes(incomesInput);
  const n = incomes.length;
  if (n === 0) return [];
  const sorted = [...incomes].sort((a, b) => a - b);
  const total = sorted.reduce((s, x) => s + x, 0) || 1;
  const k = groups;
  const result: { label: string; value: number; share: number }[] = [];
  for (let i = 0; i < k; i++) {
    const start = Math.floor((i * n) / k);
    const end = Math.floor(((i + 1) * n) / k);
    const slice = sorted.slice(start, end);
    const sum = slice.reduce((s, x) => s + x, 0);
    result.push({
      label: k === 10 ? `D${i + 1}` : `Q${i + 1}`,
      value: sum,
      share: sum / total,
    });
  }
  return result;
}

// Marxian surplus value metrics
// s' = s / v ;  p' = s / (c + v)
export function computeSurplus({
  c,
  v,
  s,
  totalProductValue,
  wage,
}: {
  c: number;
  v: number;
  s?: number;
  totalProductValue?: number;
  wage?: number;
}) {
  const isNumber = (x: unknown) => typeof x === "number" && Number.isFinite(x);
  const fixedC = isNumber(c) ? c : 0;
  const fixedV = isNumber(v) ? v : 0;
  let surplus = isNumber(s) ? (s as number) : undefined;
  if (surplus === undefined && isNumber(totalProductValue) && isNumber(wage)) {
    surplus = (totalProductValue as number) - (wage as number);
  }
  const errors: string[] = [];
  if (!isNumber(fixedV) || !isNumber(fixedC)) {
    errors.push("Giá trị c hoặc v không hợp lệ");
  }
  if (surplus === undefined) {
    errors.push("Thiếu s (giá trị thặng dư) hoặc (tổng giá trị và tiền lương)");
  }
  const sVal = surplus ?? 0;
  const sPrime = fixedV === 0 ? undefined : sVal / fixedV;
  const pPrime = fixedC + fixedV === 0 ? undefined : sVal / (fixedC + fixedV);
  return { c: fixedC, v: fixedV, s: sVal, sPrime, pPrime, errors };
}

export function formatPercent(x: number, fractionDigits = 1) {
  return new Intl.NumberFormat(undefined, {
    style: "percent",
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(x);
}

export function toCSV(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const escape = (v: unknown) =>
    typeof v === "string" &&
    (v.includes(",") || v.includes("\n") || v.includes('"'))
      ? '"' + v.replace(/"/g, '""') + '"'
      : String(v);
  const body = rows
    .map((r) => headers.map((h) => escape((r as any)[h] ?? "")).join(","))
    .join("\n");
  return headers.join(",") + "\n" + body;
}
