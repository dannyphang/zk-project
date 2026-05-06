// ─── Board Cell ─────────────────────────────────────────────────────────────
export interface BoardCell {
  index: number;
  label: string;
  type: 'start-cell' | 'end-cell' | 'special' | '';
}

// ─── Strategy Card ──────────────────────────────────────────────────────────
export interface StrategyCard {
  id: string;
  icon: string;
  label: string;
  message: string;
}

// ─── Service Card ───────────────────────────────────────────────────────────
export interface ServiceCard {
  icon: string;
  title: string;
  description: string;
  badge: string;
  colorClass: string;
}

// ─── Process Step ───────────────────────────────────────────────────────────
export interface ProcessStep {
  num: string;
  title: string;
  description: string;
}

// ─── Stat Item ──────────────────────────────────────────────────────────────
export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}
