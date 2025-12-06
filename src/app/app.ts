import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';


@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Header],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App {
    private router = inject(Router); // Injecting the Router service
    showHeader = signal(true); // true = show header, false = hide header

    constructor() {
        this.router.events // Observing router events (Observable)
            // Possible events: 
            // NavigationStart (navigation begins)
            // NavigationEnd (navigation succeeds) 
            // NavigationCancel (navigation canceled, e.g., by guards)
            // NavigationError (navigation failed)
            .pipe(filter(event => event instanceof NavigationEnd)) // Only NavigationEnd (successful events)
            .subscribe(() => { // Subscribe to the filtered events (each event is a NavigationEnd)
                this.showHeader.set(!this.router.url.startsWith('/auth')); // Hide header if URL starts with /auth
            });
    }
}
