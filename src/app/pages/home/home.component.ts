import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent implements OnInit, AfterViewInit {

  cells = [
    { label: 'START', type: 'start-cell' },
    { label: 'CONCEPT', type: '' },
    { label: 'CONCEPT', type: '' },
    { label: 'PROTOTYPE', type: '' },
    { label: 'PLAN', type: 'special' },
    { label: 'PROTOTYPE', type: '' },
    { label: 'PILOT', type: '' },
    { label: 'TEST', type: '' },
    { label: 'PILOT', type: 'special' },
    { label: 'TEST', type: '' },
    { label: 'LAUNCH', type: '' },
    { label: 'LAUNCH', type: 'special' },
    { label: 'REVIEW', type: '' },
    { label: 'SCALE', type: '' },
    { label: 'LAUNCH 🚀', type: 'end-cell' },
  ];

  diceEmoji = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
  currentStep = 0;
  isRolling = false;
  diceText = '🎲';
  gameStatus = '— Roll the dice to begin your journey —';

  isToastShow = false;
  toastMessage = '';

  isTokenVisible = false;
  tokenLeft = 0;
  tokenTop = 0;

  stat1 = 0;
  stat2 = 0;
  stat3 = 0;

  // Marquee
  items = [
    'Enterprise Gamification', 'Corporate Training', 'Boardgame Design', 'Team Building',
    'Engagement Strategy', 'Leadership Games', 'Innovation Workshops', 'Skill Development',
    'Behavioral Change', 'Play-Based Learning'
  ];
  doubledItems: string[] = [];

  // Board rows & structure
  rows: any[][] = [];
  reverseRows = [false, true, false];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.doubledItems = [...this.items, ...this.items];
    this.rows = [
      this.cells.slice(0, 5),
      this.cells.slice(5, 10),
      this.cells.slice(10, 15)
    ];
  }

  ngOnInit(): void {
    // Initialization logic if required
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupObserver();
      setTimeout(() => {
        this.placeToken(0);
      });

      window.addEventListener('resize', () => {
        this.placeToken(this.currentStep);
      });
    }
  }

  getReversed(arr: any[]): any[] {
    return [...arr].reverse();
  }

  getRealIndex(ri: number, ci: number): number {
    return ri === 1 ? (9 - ci) : (ri * 5 + ci);
  }

  setupObserver(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          this.countUp('stat1', 50, 1500);
          this.countUp('stat2', 10, 1500);
          this.countUp('stat3', 20, 1500);
          observer.disconnect();
        }
      });
    }, { threshold: 0.4 });

    const statsBar = this.el.nativeElement.querySelector('.stats-bar');
    if (statsBar) {
      observer.observe(statsBar);
    }
  }

  countUp(statKey: 'stat1' | 'stat2' | 'stat3', target: number, duration: number): void {
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      this[statKey] = Math.floor(current);
      if (current >= target) {
        clearInterval(timer);
      }
    }, 16);
  }

  activateCard(element: any, msg: string): void {
    const cards = this.el.nativeElement.querySelectorAll('.game-card');
    cards.forEach((c: HTMLElement) => c.classList.remove('active'));
    element.classList.add('active');
    this.showToast('🃏 ' + msg);
    setTimeout(() => element.classList.remove('active'), 2000);
  }

  showToast(msg: string): void {
    this.toastMessage = msg;
    this.isToastShow = true;
    setTimeout(() => {
      this.isToastShow = false;
    }, 3500);
  }

  rollDice(): void {
    if (this.isRolling || this.currentStep >= 14) return;
    this.isRolling = true;

    let count = 0;
    const interval = setInterval(() => {
      this.diceText = this.diceEmoji[Math.floor(Math.random() * 6)];
      count++;
      if (count >= 10) {
        clearInterval(interval);
        this.isRolling = false;
        const roll = Math.floor(Math.random() * 6) + 1;
        this.diceText = this.diceEmoji[roll - 1];
        this.animateMove(roll);
      }
    }, 60);
  }

  animateMove(steps: number): void {
    const target = Math.min(this.currentStep + steps, 14);
    let step = this.currentStep;
    this.gameStatus = `Rolled ${steps}! Moving ${steps} steps...`;

    const interval = setInterval(() => {
      step++;
      if (step > target) {
        clearInterval(interval);
        this.currentStep = target;
        this.isRolling = false;

        if (this.currentStep >= 14) {
          this.gameStatus = '🎉 Congratulations — your project is LIVE!';
          this.showToast('🏆 Project successfully launched! Your team wins!');
          this.spawnParticles();
        } else {
          const msgs = [
            `Step ${this.currentStep}: Keep the momentum going!`,
            `Reached "${this.cells[this.currentStep].label}" — stay on track!`,
            `Phase ${this.currentStep}/14 complete. Roll again!`,
          ];
          this.gameStatus = msgs[this.currentStep % msgs.length];
        }
        return;
      }

      this.currentStep = step;
      this.placeToken(this.currentStep);

      if (this.cells[step] && this.cells[step].type === 'special') {
        this.showToast(`⭐ Special tile! "${this.cells[step].label}" — bonus event triggered!`);
      }
    }, 180);
  }

  placeToken(idx: number): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const board = this.el.nativeElement.querySelector('.board-bg');
    const container = this.el.nativeElement.querySelector('.board-container');
    const cellsEl = this.el.nativeElement.querySelectorAll('.cell');
    const targetCell = cellsEl[idx];

    if (!targetCell || !board || !container) return;

    const boardRect = board.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const cellRect = targetCell.getBoundingClientRect();

    this.isTokenVisible = true;
    this.tokenLeft = cellRect.left - containerRect.left + (cellRect.width / 2);
    this.tokenTop = cellRect.top - containerRect.top + 20;
  }

  spawnParticles(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const colors = ['#00f5ff', '#9b5cf6', '#ff2d78', '#ffc532'];
    for (let i = 0; i < 24; i++) {
      const p = this.renderer.createElement('div');
      this.renderer.addClass(p, 'particle');
      const size = Math.random() * 8 + 4;

      const tx = (Math.random() - 0.5) * 200;
      const ty = (Math.random() - 1) * 200;

      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.background = colors[i % colors.length];
      p.style.left = `${40 + Math.random() * 20}vw`;
      p.style.top = `${30 + Math.random() * 40}vh`;

      p.style.setProperty('--tx', `${tx}px`);
      p.style.setProperty('--ty', `${ty}px`);
      p.style.animationDelay = `${i * 0.04}s`;

      this.renderer.appendChild(this.el.nativeElement, p);
      setTimeout(() => {
        this.renderer.removeChild(this.el.nativeElement, p);
      }, 1200);
    }
  }

  scrollToServices(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}