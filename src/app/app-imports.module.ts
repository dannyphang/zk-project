import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

//i18n
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './layout/layout.module';

export const imports = [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    LayoutModule,
];
