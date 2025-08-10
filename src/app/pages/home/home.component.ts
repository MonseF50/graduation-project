import { ProductsService } from './../../core/services/products/products.service';
import {
  AfterViewInit,
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategries } from '../../shared/interfaces/Icategries';
import { IProducts } from '../../shared/interfaces/iproducts';
import { AccordionModule } from 'primeng/accordion';
import { Subscription } from 'rxjs';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { RouterLink } from '@angular/router';
import { Tooltip } from 'primeng/tooltip';
import AOS from 'aos';
import { isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';
@Component({
  selector: 'app-home',
  imports: [
    CarouselModule,
    AccordionModule,
    ProductCardComponent,
    RouterLink,
    TranslatePipe,
    Tooltip,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly categoreiesServices = inject(CategoriesService);
  private readonly procuctsServices = inject(ProductsService);
  private myTranslateService = inject(MyTranslateService)
  private ID = inject(PLATFORM_ID);
  catergorSubscription!: Subscription;
  productSubscription!: Subscription;
  categriesData: ICategries[] | null = null;
  productsData: IProducts[] | null = null;
  isTranslated: boolean = false

  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  private intervalId: any;
  // method to call categories
  // method to call categories
  constructor() {
    effect(() => {
      let currentLang = this.myTranslateService.currentlang

      if (currentLang() === 'en') {
        this.isTranslated = false
      } else {
        this.isTranslated = true
      }
      console.log(this.isTranslated);
    })
  }
  ngOnInit(): void {

    this.callCategries();
    this.callProducts();
    if (isPlatformBrowser(this.ID)) {
      AOS.init();
    }
    this.startCountdown();
  }
  callCategries() {
    this.catergorSubscription = this.categoreiesServices
      .getCategories()
      .subscribe({
        next: (res) => {
          this.categriesData = res.data;
        },
      });
  }
  // method to call porducts
  callProducts() {
    this.productSubscription = this.procuctsServices.getProducts().subscribe({
      next: (res) => {
        this.productsData = res.data;
        this.customOptions = { ...this.customOptions };
      },
    });
  }
  startCountdown() {
    const targetDate = new Date('2025-09-01').getTime();

    this.intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(this.intervalId);
        this.days = this.hours = this.minutes = this.seconds = 0;
        alert('الوقت انتهى!');
        return;
      }

      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    }, 1000);
  }
  ngOnDestroy(): void {
    this.catergorSubscription!.unsubscribe();
    this.productSubscription!.unsubscribe();
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    rtl: this.isTranslated,
    autoplayHoverPause: true,
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    autoplayTimeout: 4000,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };
  //!  object of product in the pouplar section
  productOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    rtl: this.isTranslated,
    autoplayHoverPause: true,
    dots: false,
    autoplay: true,
    autoplaySpeed: 1000,
    autoplayTimeout: 3000,
    navSpeed: 700,
    margin: 20,
    navText: ['', ''],

    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
      1260: {
        items: 6,
      },
    },
    nav: false,
  };
}
