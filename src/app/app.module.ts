import { NgModule } from '@angular/core';
import { imports } from './app-imports.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
    ],
    imports: [
        ...imports, // Spread imports array here
    ],
    providers: [],
})
export class AppModule { }
