import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessStep } from '../../../models/game.models';

@Component({
  selector: 'app-process-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './process-section.component.html',
  styleUrls: ['./process-section.component.scss'],
})
export class ProcessSectionComponent {
  readonly steps: ProcessStep[] = [
    {
      num: '01',
      title: 'Discovery',
      description:
        'We audit your business goals, culture, and pain points to identify gamification opportunities.',
    },
    {
      num: '02',
      title: 'Concept',
      description:
        'Our designers sketch game mechanics, narrative arcs, and engagement loops tailored to your brand.',
    },
    {
      num: '03',
      title: 'Prototype',
      description:
        'Rapid playtesting with real teams. We iterate fast until the game actually works and delights.',
    },
    {
      num: '04',
      title: 'Launch',
      description:
        'Full deployment with facilitator training, analytics dashboards, and ongoing optimization support.',
    },
  ];
}
