import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';


export const appRoutes: Routes = [
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

    {
        path: '',
        component: AppLayout,
        children: [
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
