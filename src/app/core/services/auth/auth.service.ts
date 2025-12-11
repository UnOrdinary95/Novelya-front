import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, tap, catchError, of } from 'rxjs';
import { LoginResponse } from '../../models/loginResponse';
import { RegisterResponse } from '../../models/registerResponse';
import { LogoutResponse } from '../../models/logoutResponse';
import { CurrentUserResponse } from '../../models/currentUserResponse';
import { RegisterInput } from '../../models/RegisterInput';
import { LoginInput } from '../../models/LoginInput';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private httpClient = inject(HttpClient);
    private readonly apiUrl = environment.apiUrl;

    currentUserId = signal<string>('');
    isAuthenticated = signal(false);
    isAdmin = signal(false);

    login(loginInput: LoginInput): Observable<LoginResponse> {
        return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, loginInput).pipe(
            tap(() => this.checkAuth().subscribe()), // Après une connexion réussie, on vérifie l'état d'authentification
        );
    }

    register(registerInput: RegisterInput): Observable<RegisterResponse> {
        return this.httpClient.post<RegisterResponse>(`${this.apiUrl}/register`, registerInput);
    }

    logout(): Observable<LogoutResponse> {
        return this.httpClient.post<LogoutResponse>(`${this.apiUrl}/logout`, {}).pipe(
            tap((response) => {
                if (!environment.production) {
                    console.log(response.message); // Succès de la déconnexion
                }
                // tap est un opérateur RxJS qui permet d'effectuer des side effects sans modifier le flux de données
                // Ici, la deconnexion a pour side effect de mettre à jour les signaux à false
                this.isAuthenticated.set(false);
                this.isAdmin.set(false);
            }),
        );
    }

    checkAuth(): Observable<CurrentUserResponse | null> {
        return this.httpClient.get<CurrentUserResponse>(`${this.apiUrl}/users/me`).pipe(
            tap((response) => {
                if (response.id) {
                    this.isAuthenticated.set(true);
                    this.currentUserId.set(response.id);
                }
                if (response.isAdmin) {
                    this.isAdmin.set(true);
                }
            }),
            catchError(() => {
                this.isAuthenticated.set(false);
                this.isAdmin.set(false);
                this.currentUserId.set('');
                return of(null); // Retourne un observable de valeur nulle en cas d'erreur
            }),
        );
    }
}
