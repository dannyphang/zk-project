// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { TestingComponent } from './pages/testing/testing.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'home',
                loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            }
        ],
    },
    {
        path: 'testing64',
        loadChildren: () => import('./pages/testing/testing.module').then(m => m.TestingModule),
    }
];