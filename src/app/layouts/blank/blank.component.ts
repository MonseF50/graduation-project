import {
  Component,
  ElementRef,
  inject,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SharedvalueService } from '../../core/services/shared/sharedvalue.service';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { DrawerModule } from 'primeng/drawer';
import { CartService } from '../../core/services/cart/cart.service';
import { CartResponse } from '../../shared/interfaces/cart/cart-respons';
import { CartData } from '../../shared/interfaces/cart/cart-data';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-blank',
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterOutlet,
    RouterLink,
    NgxSpinnerComponent,
    TranslatePipe,
    DrawerModule,
  ],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.scss',
})
export class BlankComponent implements OnInit {
  @ViewChild('progressWrap', { static: false }) progressWrap!: ElementRef<any>;
  @ViewChild('progressPath', { static: false }) progressPath!: ElementRef<any>;
  private sharedvalueService = inject(SharedvalueService);
  private cartService = inject(CartService);
  paddingTopSection!: number;
  private pathLength!: number;
  cartData: CartData | null = null;
  visible: boolean = false;
  private offset = 125;
  ngAfterViewInit(): void {
    const path = this.progressPath?.nativeElement;
    const wrapper = this.progressWrap?.nativeElement;
    if (!path || typeof path.getTotalLength !== 'function') {
      console.error('progressPath is not an SVGCircleElement or missing.');
      return;
    }

    this.pathLength = path.getTotalLength();

    path.style.transition = 'none';
    path.style.strokeDasharray = `${this.pathLength} ${this.pathLength}`;
    path.style.strokeDashoffset = `${this.pathLength}`;
    path.getBoundingClientRect();
    path.style.transition = 'stroke-dashoffset 10ms linear';

    window.addEventListener('scroll', () => {
      const scrollY =
        window.pageYOffset || document.documentElement.scrollTop || 0;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      const progress =
        this.pathLength -
        (scrollY * this.pathLength) / (documentHeight - windowHeight);
      path.style.strokeDashoffset = `${progress}`;

      if (scrollY > this.offset) {
        wrapper.classList.add('progress--is-active');
      } else {
        wrapper.classList.remove('progress--is-active');
      }
    });

    wrapper.addEventListener('click', (event: Event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  ngOnInit(): void {
    this.callCartProduct();
  }
  // * method to call cart api andupdate toe porduct count

  callCartProduct(): void {
    this.cartService.getLoggedUerCart().subscribe({
      next: (res) => {
        this.cartData = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // * method to call cart api andupdate toe porduct count
  updateProductQuinty(id: string, count: any): void {
    this.cartService.updateCartProductQuantity(id, count).subscribe({
      next: (res) => {
        this.cartData = res.data;
        this.cartService?.cartProdurctsNumber.set(res.numOfCartItems)
        this.cartService?.productsCartPrice.set(res.data.totalCartPrice)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // * method to call cart api delete porduct from cart
  deleteProduct(id: string): void {
    this.cartService.deleteSpecificProduct(id).subscribe({
      next: (res) => {
        this.cartData = res.data;
        this.cartService?.cartProdurctsNumber.set(res.numOfCartItems)
        this.cartService?.productsCartPrice.set(res.data.totalCartPrice)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getCartProduct(): void {
    this.callCartProduct();
    this.visible = true;
  }
}
