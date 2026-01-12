import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth-guard';

export const routes: Routes = [
    // Public routes
    {
        path: 'login',
        loadComponent: () =>
            import('./features/auth/components/login.component').then((m) => m.LoginComponent),
    },
    {
        path: 'unauthorized',
        loadComponent: () =>
            import('./features/auth/components/unauthorized.component').then((m) => m.UnauthorizedComponent),
    },

    // Protected routes
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
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
