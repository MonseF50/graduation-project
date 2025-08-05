import { CategoriesService } from './../../core/services/categories/categories.service';
import { IProducts } from './../../shared/interfaces/iproducts';
import { SharedvalueService } from './../../core/services/shared/sharedvalue.service';
import { AuthService } from './../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Component, HostListener, inject, OnInit, PLATFORM_ID, ViewChild, ElementRef, AfterViewInit, Renderer2, Input } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Subscription } from 'rxjs';
import { ICategries } from '../../shared/interfaces/Icategries';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { MenuItem, MessageService } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';
import { WishListComponent } from "../../shared/components/wish-list/wish-list.component"
import { LanguageComponent } from "../../shared/components/language/language.component";
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    DrawerModule,
    ButtonModule,
    PanelMenu,
    WishListComponent,
    LanguageComponent,
  ],
  providers: [MessageService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  @Input() isLogged !: boolean
  @ViewChild('navbar') navbar !: ElementRef<HTMLElement>
  @ViewChild('pordutsLi') pordutsLi !: ElementRef<HTMLElement>
  private renderer2 = inject(Renderer2)
  private sharedvalueService = inject(SharedvalueService)
  private authService = inject(AuthService)
  private productsServices = inject(ProductsService)
  private categoriesService = inject(CategoriesService)
  private cartService = inject(CartService)
  private router = inject(Router)
  private Id = inject(PLATFORM_ID)
  porductSubscribtion!: Subscription
  productsData: IProducts[] | null = null;
  categoriesData: ICategries[] | null = null;
  topSoldProducts: IProducts[] | null = null;
  items!: MenuItem[];
  naBarVisible: boolean = false;
  isScrolled: boolean = false
  IsPrductMegaMenueShow: boolean = false
  isNavbarOverlayShow: boolean = false
  userName: string | null = null
  cartproductNumber: number = 0
  totalProductsPrice: number = 0
  callProduct() {
    this.productsServices.getProducts().subscribe({
      next: (res) => {
        this.productsData = res.data
        this.TopSoldProducts(res.data);
      }, error: (error) => {
        console.log(error);
      }
    })
  }
  callCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        this.categoriesData = res.data
      }, error: (error) => {
        console.log(error);
      }
    })
  }
  ngOnInit(): void {
    this.callProduct()
    this.callCategories()
    this.NavbarMobileContent()
    this.getUserData()
    this.getCartDetails()
  }
  // * Listener to add class fixed top to the navbar if user scroll
  @HostListener('window:scroll', ['$event']) onScroll(): void {
    if (scrollY > 200) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false
    }
  }
  logOut(): void {
    this.authService.logOut()
  }
  TopSoldProducts(products: IProducts[]): void {
    const seenTitles = new Set<string>();
    this.topSoldProducts = [...products]
      .sort((a, b) => b.sold - a.sold)
      .filter(p => {
        return !seenTitles.has(p.title) && seenTitles.add(p.title);
      })
      .slice(0, 10);
  }
  // toggleMgaMenue() {
  //   const list = this.pordutsLi.nativeElement
  //   if (this.IsPrductMegaMenueShow == false) {
  //     this.renderer2.setStyle(list, 'display', 'grid')
  //     this.IsPrductMegaMenueShow = true;
  //   } else {
  //     this.IsPrductMegaMenueShow = false
  //     this.renderer2.setStyle(list, 'display', 'block')
  //   }
  // }
  //* method to fill the data of mobile navbar
  NavbarMobileContent() {
    const categoreName = this.categoriesData?.map((ele) => {
      return ele.name
    })
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
          this.closeNavbarMobile()
          this.router.navigate(['/home'])
        }
      },
      {
        label: 'Cart',
        icon: 'pi pi-cart-arrow-down',
        command: () => {
          this.closeNavbarMobile()
          this.router.navigate(['/cart'])
        }
      },
      {
        label: 'Porducts',
        icon: 'pi pi-home',
        items: [
          {
            label: 'porduct one',
            icon: 'pi pi-star',
            command: () => {
              this.closeNavbarMobile()
              this.router.navigate(['/products'])
            }
          },
          {
            label: 'product two',
            icon: 'pi pi-bookmark',
            command: () => {
              this.closeNavbarMobile()
              this.router.navigate(['/products'])
            }
          }
        ]
      },
      {
        label: 'Categories',
        icon: 'pi pi-warehouse',
        items: [
          {
            label: "Men's Fashion",
            command: () => {
              this.closeNavbarMobile()
              this.router.navigate(['/categories'])
            }
          },
          {
            label: "Women's Fashion",
            command: () => {
              this.closeNavbarMobile()
              this.router.navigate(['/categories'])
            }
          },
          {
            label: "Electronics",
            command: () => {
              this.closeNavbarMobile()
              this.router.navigate(['/categories'])
            }
          },

        ]
      },
      {
        label: 'Brands',
        icon: 'pi pi-sparkles',
        items: [
          {
            label: "Men's Fashion",

            command: () => {
              this.closeNavbarMobile()
              this.router.navigate(['/products'])
            }
          },
          {
            label: "Women's Fashion",
            command: () => {
              this.closeNavbarMobile()
              this.router.navigate(['/products'])
            }
          },
          {
            label: "Electronics",
            command: () => {
              this.closeNavbarMobile()
              this.router.navigate(['/products'])
            }
          },

        ]
      }
    ];
  }
  //* method to close mobile navbar when click of link of navbar
  closeNavbarMobile() {
    this.naBarVisible = false;
  }
  getUserData() {
    this.userName = this.sharedvalueService.userData?.name!
  }
  getCartDetails() {
    this.cartService.getLoggedUerCart().subscribe({
      next: (res) => {
        this.cartService.cartProdurctsNumber.next(res.numOfCartItems)
        this.cartService.productsCartPrice.next(res.data.totalCartPrice)
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.cartService.cartProdurctsNumber.subscribe({
      next: (value) => {
        this.cartproductNumber = value
      }
    })
    this.cartService.productsCartPrice.subscribe({
      next: (value) => {
        this.totalProductsPrice = value
      }
    })
  }
}

