import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast" [class.show]="game.toastVisible()">
      {{ game.toastMessage() }}
    </div>
  `,
  styles: [`
    :host { display: contents; }
  `],
})
export class ToastComponent {
  game = inject(GameService);
}
