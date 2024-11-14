import { Routes } from '@angular/router';
import { LayoutComponent } from '@shared/components/layout/layout.component';
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';
import { LoginComponent } from './domains/auth/pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { SignUpComponent } from './domains/auth/pages/sign-up/sign-up.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthLogoutGuard } from './guards/auth-logout.guard';
import { CreateProductComponent } from './domains/admin/components/create-product/create-product.component';
import { AllProductsComponent } from '@shared/components/all-products/all-products.component';
import { SearchByNameComponent } from '@shared/components/search-by-name/search-by-name.component';
import { SearchByIdComponent } from '@shared/components/search-by-id/search-by-id.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        //canActivate: [AuthLogoutGuard]
    },
    {
        path: 'signup',
        component: SignUpComponent,
        canActivate: [AuthLogoutGuard]
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
            },
            {
                path: 'administrator',
                loadComponent: () => import('./domains/admin/pages/menu/menu.component'),
                canActivate: [AdminGuard], children: [
                    {
                        path: 'create-product',
                        component: CreateProductComponent
                    },
                    {
                        path: 'get-all-products',
                        component: AllProductsComponent
                    },
                    {
                        path: 'search-by-name/:name',
                        component: SearchByNameComponent
                    },
                    {
                        path: 'search-by-id/:id',
                        component: SearchByIdComponent
                    },
                    {
                      path: '',
                      redirectTo: 'create-product',
                      pathMatch: 'full'
                    }
                ]
            }
        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];