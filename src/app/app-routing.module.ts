import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
    {
        path: 'test',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
            },
        ]
    },
    {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
