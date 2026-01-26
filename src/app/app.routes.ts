import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth-guard';
import { LayoutComponent } from './core/layout/layout.component';
import { SupplierListComponent } from './features/supply/suppliers/components/supplier-list/supplier-list.component';

export const routes: Routes = [
    // Public routes
    {
        path: 'login',
        loadComponent: () =>
            import('./features/auth/components/login-card/auth-card.component').then((m) => m.AuthCardComponent),
    },

    {
        path: 'unauthorized',
        loadComponent: () =>
            import('./features/auth/pages/unauthorized/unauthorized.component').then((m) => m.UnauthorizedComponent),
    },

    // Protected routes
    {
        path: 'dashboard',
        canActivate: [authGuard],
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'suppliers',
                component: SupplierListComponent
            },
            {
                path: 'supply/materials',
                loadComponent: () => import('./features/supply/raw-materials/components/material-list/material-list.component').then(m => m.MaterialListComponent)
            },
            {
                path: 'supply/orders',
                loadComponent: () => import('./features/supply/supply-orders/components/order-list/order-list.component').then(m => m.OrderListComponent)
            }
        ]
    },

    // Example with role-based access:
    // {
    //   path: 'admin',
    //   canActivate: [authGuard],
    //   data: { roles: ['admin'] }, // Role-based access
    //   loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent),
    // },

    // Default redirect
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
    },

    // Wildcard route - 404
    {
        path: '**',
        redirectTo: '/dashboard',
    },
];
