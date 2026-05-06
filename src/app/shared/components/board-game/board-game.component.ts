import {
  Component, inject, OnInit, AfterViewInit,
  OnDestroy, ViewChildren, QueryList,
  ElementRef, ViewChild, ChangeDetectorRef,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../../services/game.service';
import { BoardCell } from '../../../models/game.models';

@Component({
  selector: 'app-board-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board-game.component.html',
  styleUrls: ['./board-game.component.scss'],
})
export class BoardGameComponent implements OnInit, AfterViewInit, OnDestroy {
  game = inject(GameService);
  private cdr = inject(ChangeDetectorRef);

  // Board laid out as 3 rows (snake pattern)
  boardRows!: BoardCell[][];
  reverseRow = [false, true, false];

  // Token position
  tokenLeft = signal<string>('0px');
  tokenTop = signal<string>('0px');
  tokenVisible = signal<boolean>(false);

  // Active card
  activeCard = signal<string>('');

  // Dice animation flag
  diceAnimating = signal<boolean>(false);

  @ViewChildren('cellEl') cellEls!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChild('boardContainer') boardContainerRef!: ElementRef<HTMLDivElement>;

  private resizeObserver!: ResizeObserver;

  ngOnInit(): void {
    // Slice cells into rows
    const all = this.game.cells;
    this.boardRows = [
      all.slice(0, 5),
      [...all.slice(5, 10)],   // reversed visually via CSS flex-direction
      all.slice(10, 15),
    ];
  }

  ngAfterViewInit(): void {
    // Place token on first cell after view is ready
    setTimeout(() => {
      this.placeToken(0);
      this.tokenVisible.set(true);
    }, 100);

    // Re-place on resize
    this.resizeObserver = new ResizeObserver(() => {
      this.placeToken(this.game.currentStep());
    });
    if (this.boardContainerRef) {
      this.resizeObserver.observe(this.boardContainerRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  // Cell CSS class string
  cellClass(cell: BoardCell): string {
    const state = this.game.cellState(cell.index);
    const classes = ['cell', cell.type];
    if (state === 'active') classes.push('active-cell');
    if (state === 'passed') classes.push('passed');
    return classes.filter(Boolean).join(' ');
  }

  async onRoll(): Promise<void> {
    if (!this.game.canRoll()) {
      this.game.restart();
    }
    else {
      this.diceAnimating.set(true);
      setTimeout(() => this.diceAnimating.set(false), 550);

      await this.game.roll();
    }

    this.placeToken(this.game.currentStep());
    this.cdr.detectChanges();
  }

  onCardClick(cardId: string, message: string): void {
    this.activeCard.set(cardId);
    this.game.showToast('🃏 ' + message);
    setTimeout(() => this.activeCard.set(''), 2000);
  }

  private placeToken(idx: number): void {
    if (!this.cellEls) return;

    // Find the cell element by its data-index attribute
    const cellEl = this.cellEls.find(
      el => el.nativeElement.dataset['index'] === String(idx)
    );
    if (!cellEl || !this.boardContainerRef) return;

    const containerRect = this.boardContainerRef.nativeElement.getBoundingClientRect();
    const cellRect = cellEl.nativeElement.getBoundingClientRect();

    this.tokenLeft.set(`${cellRect.left - containerRect.left + cellRect.width / 2}px`);
    this.tokenTop.set(`${cellRect.top - containerRect.top + cellRect.height / 2 + 20}px`);
  }

  // Track cells by index for ngFor performance
  trackByIndex(_: number, cell: BoardCell): number {
    return cell.index;
  }
}
