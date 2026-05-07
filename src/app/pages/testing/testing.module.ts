import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestingRoutingModule } from './testing-routing-module';
import { TestingComponent } from './testing.component';
import { ComponentImports } from '../../shared/modules/component-import.module';

@NgModule({
  declarations: [
    TestingComponent
  ],
  imports: [CommonModule, TestingRoutingModule, ComponentImports],
})
export class TestingModule { }
