import { Component, HostListener, inject, OnInit } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { WishListService } from '../../../core/services/wishList/wish-list.service';
import { IProducts } from '../../interfaces/iproducts';

@Component({
  selector: 'app-wish-list',
  imports: [DrawerModule],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit {
  private wishListService = inject(WishListService)
  visible: boolean = false;
  wishListProducts: IProducts | null = null
  ngOnInit(): void {
    this.callWishList()
  }
  callWishList(): void {
    this.wishListService.getLoggedUserWishList().subscribe({
      next: (res) => {
        this.wishListProducts = res.data
        // console.log(this.wishListProducts);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
