import { Routes } from '@angular/router';
import { Login } from './core/pages/login/login';
import { Register } from './core/pages/register/register';
import { Error404 } from './core/pages/error/error404/error404';
import { Error403 } from './core/pages/error/error403/error403';

export const routes: Routes = [
    { path: 'auth/login', component: Login },
    { path: 'auth/register', component: Register },
    { path: 'error/404', component: Error404 },
    { path: 'error/403', component: Error403 },
    // { path: '**', redirectTo: 'error/404' }
];
