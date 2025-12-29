import { Component, inject, input, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap, catchError, of } from 'rxjs';
import { LightNovel } from '@core/models/LightNovel';
import { LightNovelService } from '@core/services/lightnovel/lightnovel.service';
import { CartService } from '@core/services/cart/cart.service';
import { UserService } from '@core/services/user/user.service';
import { environment } from '@environments/environment';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButton } from '@spartan-ng/helm/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { lucideShoppingCart, lucideArrowLeft, lucideCalendar, lucideUser, lucideStar, lucideCheck } from '@ng-icons/lucide';
import { toast } from 'ngx-sonner';

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
            lucideCheck,
        }),
    ],
})
export class Lightnovel {
    private router = inject(Router);
    private lightNovelService = inject(LightNovelService);
    private cartService = inject(CartService);
    private userService = inject(UserService);

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

    isInCart = computed(() => {
        const cart = this.userService.currentUser()?.cart ?? [];
        const ln = this.lightNovel();
        return ln ? cart.some(item => item.lightNovelId === ln._id) : false;
    });

    isInWishlist = computed(() => {
        const wishlist = this.userService.currentUser()?.wishlist ?? [];
        const ln = this.lightNovel();
        return ln?._id ? wishlist.includes(ln._id) : false;
    });

    goBack(): void {
        window.history.back();
    }

    getGenreRoute(genre: string): string {
        return genre.toLowerCase().replace(/ /g, '-');
    }

    toggleCart() {
        const id = this.lightNovel()?._id;
        if (!id) return;

        const isRemoving = this.isInCart();
        const title = this.lightNovel()?.title ?? '';

        this.cartService.updateCart(id, isRemoving ? -1 : 1).subscribe({
            next: () => {
                toast.success(isRemoving ? 'Removed from cart' : 'Added to cart', {
                    description: title,
                });
            },
            error: () => {
                toast.error('Failed to update cart', {
                    description: 'Please try again later',
                });
            },
        });
    }

    toggleWishlist() {
        const id = this.lightNovel()?._id;
        if (!id) return;

        const isRemoving = this.isInWishlist();
        const title = this.lightNovel()?.title ?? '';

        this.userService.updateWishlist(id).subscribe({
            next: () => {
                toast.success(isRemoving ? 'Removed from wishlist' : 'Added to wishlist', {
                    description: title,
                });
            },
            error: () => {
                toast.error('Failed to update wishlist', {
                    description: 'Please try again later',
                });
            },
        });
    }
}
