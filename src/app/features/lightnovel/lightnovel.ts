import { Component, inject, input, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap, catchError, of } from 'rxjs';
import { LightNovel } from '@core/models/LightNovel';
import { LightNovelService } from '@core/services/lightnovel/lightnovel.service';
import { environment } from '@environments/environment';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButton } from '@spartan-ng/helm/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { lucideShoppingCart, lucideArrowLeft, lucideCalendar, lucideUser, lucideStar } from '@ng-icons/lucide';

@Component({
    selector: 'app-lightnovel',
    imports: [CommonModule, CurrencyPipe, DatePipe, RouterLink, HlmBadgeImports, HlmButton, NgIcon, HlmIcon],
    templateUrl: './lightnovel.html',
    styleUrl: './lightnovel.css',
    providers: [
        provideIcons({
            lucideShoppingCart,
            lucideArrowLeft,
            lucideCalendar,
            lucideUser,
            lucideStar,
        }),
    ],
})
export class Lightnovel {
    private router = inject(Router);
    private lightNovelService = inject(LightNovelService);

    id = input.required<string>();

    lightNovel = toSignal(
        toObservable(this.id).pipe(
            switchMap(id =>
                this.lightNovelService.getLightNovelById(id).pipe(
                    catchError((error) => {
                        if (!environment.production) {
                            console.error(error);
                        }
                        this.router.navigate(['/error/404']);
                        return of(null);
                    })
                )
            )
        ),
        { initialValue: null as LightNovel | null }
    );

    isOutOfStock = computed(() => {
        const ln = this.lightNovel();
        return ln ? !ln.inStock : false;
    });

    goBack(): void {
        window.history.back();
    }

    getGenreRoute(genre: string): string {
        return genre.toLowerCase().replace(/ /g, '-');
    }
}
