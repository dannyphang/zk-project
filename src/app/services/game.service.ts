import { Injectable, signal, computed } from '@angular/core';
import { BoardCell, StrategyCard } from '../models/game.models';

@Injectable({ providedIn: 'root' })
export class GameService {
  // ── Board data ──────────────────────────────────────────────────────────
  readonly cells: BoardCell[] = [
    { index: 0, label: 'START', type: 'start-cell' },
    { index: 1, label: 'CONCEPT', type: '' },
    { index: 2, label: 'CONCEPT', type: '' },
    { index: 3, label: 'PROTOTYPE', type: '' },
    { index: 4, label: 'PLAN', type: 'special' },
    { index: 5, label: 'PROTOTYPE', type: '' },
    { index: 6, label: 'PILOT', type: '' },
    { index: 7, label: 'TEST', type: '' },
    { index: 8, label: 'PILOT', type: 'special' },
    { index: 9, label: 'TEST', type: '' },
    { index: 10, label: 'LAUNCH', type: '' },
    { index: 11, label: 'LAUNCH', type: 'special' },
    { index: 12, label: 'REVIEW', type: '' },
    { index: 13, label: 'SCALE', type: '' },
    { index: 14, label: '🚀 LAUNCH', type: 'end-cell' },
  ];

  readonly BOARD_SIZE = this.cells.length - 1; // 14

  // ── Dice face emojis ────────────────────────────────────────────────────
  readonly diceEmoji = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

  // ── Reactive state ──────────────────────────────────────────────────────
  currentStep = signal<number>(0);
  diceValue = signal<string>('🎲');
  isRolling = signal<boolean>(false);
  gameStatus = signal<string>('— Roll the dice to begin your journey —');
  gameWon = signal<boolean>(false);
  toastMessage = signal<string>('');
  toastVisible = signal<boolean>(false);

  // ── Computed helpers ────────────────────────────────────────────────────
  stepLabel = computed(() => `${this.currentStep()}/${this.BOARD_SIZE}`);

  canRoll = computed(() =>
    !this.isRolling() && !this.gameWon()
  );

  cellState(index: number): 'active' | 'passed' | 'normal' {
    const cur = this.currentStep();
    if (index === cur) return 'active';
    if (index < cur) return 'passed';
    return 'normal';
  }

  // ── Strategy cards ──────────────────────────────────────────────────────
  readonly strategyCards: StrategyCard[] = [
    {
      id: 'strategy',
      icon: '🎯',
      label: 'Strategy Card',
      message: 'Strategy: Align team goals with company OKRs using game mechanics.',
    },
    {
      id: 'chance',
      icon: '🎲',
      label: 'Chance Card',
      message: 'Chance: A surprise challenge boosts team morale by 40%!',
    },
    {
      id: 'knowledge',
      icon: '📚',
      label: 'Knowledge Card',
      message: 'Knowledge: Complete the training module. Gain 2 XP points!',
    },
    {
      id: 'power',
      icon: '⚡',
      label: 'Power Card',
      message: 'Power Up: Double your productivity score this round!',
    },
  ];

  // ── Roll dice ────────────────────────────────────────────────────────────
  roll(): Promise<void> {
    if (!this.canRoll()) return Promise.resolve();

    this.isRolling.set(true);
    return new Promise(resolve => {
      let count = 0;
      const anim = setInterval(() => {
        this.diceValue.set(this.diceEmoji[Math.floor(Math.random() * 6)]);
        count++;
        if (count >= 10) {
          clearInterval(anim);
          const rolled = Math.floor(Math.random() * 6) + 1;
          this.diceValue.set(this.diceEmoji[rolled - 1]);
          this._animateMove(rolled, resolve);
        }
      }, 60);
    });
  }

  private _animateMove(steps: number, resolve: () => void): void {
    const target = Math.min(this.currentStep() + steps, this.BOARD_SIZE);
    let step = this.currentStep();

    this.gameStatus.set(`Rolled ${steps}! Moving ${steps} steps…`);

    const interval = setInterval(() => {
      step++;
      if (step > target) {
        clearInterval(interval);
        this.currentStep.set(target);
        this.isRolling.set(false);

        if (target >= this.BOARD_SIZE) {
          this.gameWon.set(true);
          this.gameStatus.set('🎉 Congratulations — your project is LIVE!');
          this.showToast('🏆 Project successfully launched! Your team wins!');
          this._spawnParticles();
        } else {
          const msgs = [
            `Step ${target}: Keep the momentum going!`,
            `Reached "${this.cells[target].label}" — stay on track!`,
            `Phase ${target}/${this.BOARD_SIZE} complete. Roll again!`,
          ];
          this.gameStatus.set(msgs[target % msgs.length]);
        }
        resolve();
        return;
      }

      this.currentStep.set(step);

      if (this.cells[step].type === 'special') {
        this.showToast(`⭐ Special tile! "${this.cells[step].label}" — bonus event triggered!`);
      }
    }, 180);
  }

  // ── Toast ────────────────────────────────────────────────────────────────
  showToast(message: string): void {
    this.toastMessage.set(message);
    this.toastVisible.set(true);
    setTimeout(() => this.toastVisible.set(false), 3500);
  }

  // ── Particles ────────────────────────────────────────────────────────────
  private _spawnParticles(): void {
    const colors = ['#00f5ff', '#9b5cf6', '#ff2d78', '#ffc532'];
    for (let i = 0; i < 24; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 8 + 4;
      p.style.cssText = `
        width:${size}px; height:${size}px;
        background:${colors[i % colors.length]};
        left:${40 + Math.random() * 20}vw;
        top:${30 + Math.random() * 40}vh;
        --tx:${(Math.random() - 0.5) * 200}px;
        --ty:${(Math.random() - 1) * 200}px;
        animation-delay:${i * 0.04}s;
      `;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1400);
    }
  }

  restart(): void {
    this.currentStep.set(0);
    this.diceValue.set('🎲');
    this.gameStatus.set('— Roll the dice to begin your journey —');
    this.gameWon.set(false);
  }
}
