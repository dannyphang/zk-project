import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer>
      <div class="footer-left">
        <h3>GPLAY STUDIO</h3>
        <p>
          Transforming enterprises through the power of play. Games aren't just
          for fun — they're your most powerful business tool.
        </p>
        <div class="footer-links">
          <a href="#">Services</a>
          <a href="#">Case Studies</a>
          <a href="#">Blog</a>
          <a (click)="onContact()" href="#">Contact</a>
        </div>
      </div>
      <div class="footer-right">
        <p>© 2025 GPlay Studio<br>All rights reserved.<br>
          <span class="cn">企业游戏化</span>
        </p>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      padding: 60px;
      border-top: 1px solid var(--dark-border);
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      @media (max-width: 900px) {
        flex-direction: column;
        gap: 40px;
        padding: 40px 30px;
      }
    }
    .footer-left h3 {
      font-family: 'Orbitron', monospace;
      font-size: 22px;
      font-weight: 900;
      color: #fff;
      margin-bottom: 8px;
    }
    .footer-left p {
      font-size: 13px;
      color: var(--text-muted);
      max-width: 340px;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    .footer-links {
      display: flex;
      gap: 24px;
      a {
        text-decoration: none;
        color: var(--text-muted);
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 1px;
        text-transform: uppercase;
        cursor: pointer;
        transition: color 0.2s;
        &:hover { color: var(--neon-cyan); }
      }
    }
    .footer-right {
      text-align: right;
      p {
        font-family: 'Space Mono', monospace;
        font-size: 11px;
        color: var(--text-muted);
        line-height: 1.8;
      }
      @media (max-width: 900px) { text-align: left; }
    }
    .cn { color: var(--neon-cyan); }
  `],
})
export class FooterComponent {
  private game = inject(GameService);
  onContact(): void { this.game.showToast('Connecting you to our team…'); }
}
