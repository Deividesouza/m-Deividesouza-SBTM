import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Crud } from './app/pages/crud/crud';
import { FormLayout } from './app/pages/uikit/formlayout';
import { FormParticipante } from './app/pages/uikit/formparticipante';
import { FormOperador } from './app/pages/uikit/formoperador';
import { FormSupervisor } from './app/pages/uikit/formsupervisor';
import { FormGestor } from './app/pages/uikit/formgestor';
import { AuthGuard } from './app/pages/auth/auth.guard';
import { AccessDeniedComponent } from './app/pages/auth/access';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

    {
        path: '',
        component: AppLayout,
        children: [
                { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
                { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },
                { path: 'crud', component: Crud, canActivate: [AuthGuard], data: { role: '0' } },
                { path: 'formlayout', component: FormLayout, canActivate: [AuthGuard], data: { role: '0' } },
                { path: 'formsupervisor', component: FormSupervisor, canActivate: [AuthGuard], data: { role: '4' } },
                { path: 'formoperador', component: FormOperador, canActivate: [AuthGuard], data: { role: '3' } },
                { path: 'formparticipante', component: FormParticipante, canActivate: [AuthGuard], data: { role: '2' } },
                { path: 'formgestor', component: FormGestor, canActivate: [AuthGuard], data: { role: '5' } },

            ]
        },
        { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
        { path: '**', redirectTo: '/notfound' },
        { path: 'auth/access', component: AccessDeniedComponent }
    ];

