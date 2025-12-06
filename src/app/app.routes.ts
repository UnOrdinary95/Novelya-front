import { Routes } from '@angular/router';
import { Login } from './core/pages/login/login';
import { Register } from './core/pages/register/register';

export const routes: Routes = [
    { path: 'auth/login', component: Login },
    { path: 'auth/register', component: Register }
];
