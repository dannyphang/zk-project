import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marquee',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="marquee-section">
      <div class="marquee-track">
        @for (item of doubled; track $index) {
          <div class="marquee-item">
            <div class="marquee-dot"></div>
            {{ item }}
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .marquee-section {
      padding: 28px 0;
      overflow: hidden;
      border-top: 1px solid var(--dark-border);
      border-bottom: 1px solid var(--dark-border);
      position: relative;
      z-index: 1;
      background: rgba(4,8,18,0.7);
    }
    .marquee-track {
      display: flex;
      gap: 60px;
      animation: marquee 20s linear infinite;
      white-space: nowrap;
    }
    .marquee-item {
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: 'Orbitron', monospace;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 2px;
      color: var(--text-muted);
      text-transform: uppercase;
      flex-shrink: 0;
    }
    .marquee-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--neon-cyan);
    }
  `],
})
export class MarqueeComponent {
  private readonly items = [
    'Enterprise Gamification', 'Corporate Training', 'Boardgame Design',
    'Team Building', 'Engagement Strategy', 'Leadership Games',
    'Innovation Workshops', 'Skill Development', 'Behavioral Change',
    'Play-Based Learning',
  ];

  // Duplicate for seamless loop
  readonly doubled = [...this.items, ...this.items];
}
