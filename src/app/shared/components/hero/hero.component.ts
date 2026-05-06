import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../../services/game.service';
import { BoardGameComponent } from '../board-game/board-game.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, BoardGameComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  private game = inject(GameService);

  onStartJourney(): void {
    this.game.showToast("Let's build something extraordinary!");
  }

  scrollToServices(): void {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  }
}
