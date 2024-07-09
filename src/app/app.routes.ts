import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('../componentes/contact-list/contact-list.component')
    },
    {
        path: 'new',
        loadComponent: () => import('../componentes/contact-form/contact-form.component')
    },
    {
        path: ':id/edit',
        loadComponent: () => import('../componentes/contact-form/contact-form.component')
    }

];
