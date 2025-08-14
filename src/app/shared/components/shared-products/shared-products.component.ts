import { ValidationErrors } from '@angular/forms';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Component, ElementRef, inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { max, Subscription } from 'rxjs';
import { CarouselComponent } from 'ngx-owl-carousel-o';
import { Tooltip } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { Slider } from 'primeng/slider';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { AccordionModule } from 'primeng/accordion';
import { Select } from 'primeng/select';
import { ProductsService } from '../../../core/services/products/products.service';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { ICategries } from '../../interfaces/Icategries';
import { IProducts } from '../../interfaces/iproducts';
import { MySeclect } from '../../interfaces/my-seclect';


@Component({
  selector: 'app-shared-products',
  imports: [
    ProductCardComponent,
    RouterLink,
    CarouselModule,
    Select,
    Tooltip,
    AccordionModule,
    FormsModule,
    Slider,
    PaginatorModule
  ],
  templateUrl: './shared-products.component.html',
  styleUrl: './shared-products.component.scss'
})
export class SharedProductsComponent {
  @ViewChild('owlCarsouel') owlCarsouel!: CarouselComponent
  @ViewChild('productContainer') productContainer!: ElementRef<HTMLElement>
  private renderer2 = inject(Renderer2)
  private productsService = inject(ProductsService)
  private categoriesService = inject(CategoriesService)
  categoriesSubscribtion !: Subscription
  productsSubscribtion !: Subscription
  categoriesData: ICategries[] | null = null
  productsData: IProducts[] | null = null
  // porperity of the search form price
  rangeValues: number[] = [0, 10000];
  minValue: number = this.rangeValues[0];
  maxValue: number = this.rangeValues[1];
  productsArray: IProducts[] | null = null
  brands: string[] = [];
  brnadSearch: string = "";
  categoreId: string = "";
  categoreFilterName: string = "All Products"
  // pagination values
  first: number = 0;
  rows: number = 12;
  productsNumber: number = 0
  currentPage: number = 1
  // ============
  sortOptions: MySeclect[] | undefined;

  selectedSortOptions: MySeclect | undefined;
  limitOptions: MySeclect[] | undefined;

  selectedLimitOptions: MySeclect | undefined;


  ngOnInit(): void {
    this.callCategories();
    this.callProducts();
    const brandNames = this.productsArray?.map(p => p.brand.name);
    this.brands = [...new Set(brandNames)];
    this.sortOptions = [
      {
        name: 'Low To Heigh',
        value: 'price',
      },
      {
        name: 'Heigh To Low',
        value: '-price',

      },
    ];
    this.limitOptions = [
      { name: '12', value: '12' },
      { name: '24', value: '24' },
      { name: '26', value: '26' },
    ];
  }
  // * method to call all categories 
  callCategories() {
    this.categoriesSubscribtion = this.categoriesService.getCategories().subscribe({
      next: (res) => {
        this.categoriesData = res.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  // * method to call all product 
  callProducts(catId?: string, page?: number, minPrice?: number, maxPrice?: number) {
    this.productsSubscribtion = this.productsService.getProducts(catId, page, minPrice, maxPrice).subscribe({
      next: (res) => {
        // this.productsArray = res.data
        this.productsNumber = res?.results
        if (catId != undefined) {
          this.productsData = res.data
        } else {
          this.productsData = res.data
        }
        if (page != undefined) {
          this.productsData = res.data
        } else {
          this.productsData = res.data
        }
        if (minPrice != undefined && maxPrice != undefined) {
          this.productsData = res.data
        } else {
          this.productsData = res.data
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  // * custom button to carsouel 
  goNext() {
    this.owlCarsouel.next();
  }
  goPrev() {
    this.owlCarsouel.prev();
  }
  //* method to change the value of range to chose the porduct
  updateRange() {
    this.minValue = this.rangeValues[0];
    this.maxValue = this.rangeValues[1];
  }
  // * method to fillter by categorie and change categorName
  categoreFilter(catId: string, catName?: string) {
    const element = this.productContainer.nativeElement
    this.callProducts(catId)
    this.categoreId = catId;
    if (catName) {
      this.categoreFilterName = catName
    }
    this.goUp(element)
  }

  // *method to filter product by price with the range
  filterProductByPrice() {
    const element = this.productContainer.nativeElement
    // this.callProducts(this.categoreId, this.currentPage, this.minValue, this.maxValue) 
    this.goUp(element)
    this.productsService.getProducts(
      undefined,
      undefined,
      this.minValue,
      this.maxValue,
      undefined,
      undefined
    ).subscribe({
      next: (res) => {
        this.productsData = res.data
        this.productsNumber = res?.results

      },
      error: (err) => {
        console.log(err);
      }
    })

  }
  // method to changet the value of the page number 
  onPageChange(event: PaginatorState) {
    const element = this.productContainer.nativeElement
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 12;
    this.currentPage = Number(event?.page) + 1

    this.callProducts(this.categoreId, this.currentPage, this.minValue, this.maxValue)
    this.goUp(element)
  }
  goUp(ele: HTMLElement): void {
    if (ele) {
      ele.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
  // * method to get the prduct brand to display it in the megamenue
  getPrductsBySort(): void {
    this.productsService.getProducts(this.categoreId, this.currentPage, undefined, undefined, this.selectedSortOptions?.value, this.selectedLimitOptions?.value).subscribe({
      next: (res) => {
        this.productsData = res.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  getPrductsByShow(): void {
    this.productsService.getProducts(this.categoreId, this.currentPage, undefined, undefined, this.selectedSortOptions?.value, this.selectedLimitOptions?.value).subscribe({
      next: (res) => {
        this.productsData = res.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
