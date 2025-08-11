import { Component, computed, HostListener, inject, OnInit, Signal, signal } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { WishListService } from '../../../core/services/wishList/wish-list.service';
import { IProducts } from '../../interfaces/iproducts';
import { ToastService } from '../../../core/services/toast/toast.service';

@Component({
  selector: 'app-wish-list',
  imports: [DrawerModule],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss',
})
export class WishListComponent implements OnInit {
  private wishListService = inject(WishListService);
  visible: boolean = false
  wishListProducts: IProducts[] | null = null;
  wishlistProductsNumber: Signal<number> = computed(() => this.wishListService.wishCartProductNumber())
  ngOnInit(): void {
    this.callWishList();
  }
  callWishList(): void {
    this.wishListService.getLoggedUserWishList().subscribe({
      next: (res) => {
        this.wishListService.wishCartProductNumber.set(res.count)
        this.wishListProducts = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getWishListItems(): void {
    this.wishListService.getLoggedUserWishList().subscribe({
      next: (res) => {
        this.visible = true
        this.wishListProducts = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
