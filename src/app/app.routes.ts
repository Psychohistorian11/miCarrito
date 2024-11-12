import { Routes } from '@angular/router';
import { LayoutComponent } from '@shared/components/layout/layout.component';
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';
import { LoginComponent } from './domains/auth/pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard], 
        children: [
            {
                path: '',
                loadComponent: () => import('./domains/products/pages/list/list.component')
            },
            {
                path: 'product/:id',
                loadComponent: () => import('./domains/products/pages/product-detail/product-detail.component')
            }
        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];