import {
  Component, OnInit, OnDestroy,
  ElementRef, ViewChild, signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatItem } from '../../../models/game.models';

@Component({
  selector: 'app-stats-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-bar.component.html',
  styleUrls: ['./stats-bar.component.scss'],
})
export class StatsBarComponent implements OnInit, OnDestroy {
  @ViewChild('statsEl', { static: true }) statsEl!: ElementRef;

  readonly statDefs: StatItem[] = [
    { value: 50, suffix: '+', label: 'Games Built' },
    { value: 10, suffix: 'K+', label: 'Learners Trained' },
    { value: 20, suffix: '+', label: 'Industries Served' },
  ];

  displayValues = signal<string[]>(['0', '0', '0']);

  private observer!: IntersectionObserver;
  private animated = false;

  ngOnInit(): void {
    this.observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !this.animated) {
          this.animated = true;
          this.startCountUp();
        }
      },
      { threshold: 0.4 }
    );
    this.observer.observe(this.statsEl.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private startCountUp(): void {
    const duration = 1500;
    const fps = 60;
    const steps = duration / (1000 / fps);

    this.statDefs.forEach((stat, i) => {
      const increment = stat.value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + increment, stat.value);
        const vals = [...this.displayValues()];
        vals[i] = Math.floor(current).toString();
        this.displayValues.set(vals);
        if (current >= stat.value) clearInterval(timer);
      }, 1000 / fps);
    });
  }
}
