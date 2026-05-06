import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { LayoutComponent } from './layout.component';
import { FooterComponent } from '../shared/components/footer/footer.component';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    FooterComponent,

  ],
})
export class LayoutModule { }
