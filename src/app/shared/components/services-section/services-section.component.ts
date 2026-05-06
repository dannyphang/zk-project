import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCard } from '../../../models/game.models';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-section.component.html',
  styleUrls: ['./services-section.component.scss'],
})
export class ServicesSectionComponent {
  readonly services: ServiceCard[] = [
    {
      icon: '🏆',
      title: 'Game-Based Training',
      description:
        'Custom training simulations that replace boring slide decks. Your employees learn by doing — competing, collaborating, and leveling up through real corporate scenarios.',
      badge: '🎓 Corporate L&D',
      colorClass: 'card-cyan',
    },
    {
      icon: '♟️',
      title: 'Boardgame Design',
      description:
        'We craft unique physical and digital boardgames tailored for team-building retreats, onboarding experiences, and leadership development programs.',
      badge: '🎲 Team Building',
      colorClass: 'card-violet',
    },
    {
      icon: '🔮',
      title: 'Gamification Consulting',
      description:
        'Audit your existing systems and inject game dynamics — points, badges, leaderboards, and narrative arcs — into any workflow, app, or organizational process.',
      badge: '⚡ Any Industry',
      colorClass: 'card-magenta',
    },
  ];

  trackByTitle(_: number, s: ServiceCard): string {
    return s.title;
  }
}
