import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { MarqueeComponent } from '../../shared/components/marquee/marquee.component';
import { StatsBarComponent } from '../../shared/components/stats-bar/stats-bar.component';
import { ServicesSectionComponent } from '../../shared/components/services-section/services-section.component';
import { ProcessSectionComponent } from '../../shared/components/process-section/process-section.component';
import { ToastComponent } from '../../shared/components/toast.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HeroComponent,
    MarqueeComponent,
    StatsBarComponent,
    ServicesSectionComponent,
    ProcessSectionComponent,
    ToastComponent,
  ],
})
export class HomeModule { }
