import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth-guard';

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
        // loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
        loadComponent: () => import('./core/layout/sidebar/sidebar.component').then(m => m.SidebarComponent),
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
