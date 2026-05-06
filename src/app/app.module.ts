import { NgModule } from '@angular/core';
import { imports } from './app-imports.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        ...imports, // Spread imports array here
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
