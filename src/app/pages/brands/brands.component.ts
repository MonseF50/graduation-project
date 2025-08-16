import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Brand } from '../../shared/interfaces/brands/brand';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SpacificBrand } from '../../shared/interfaces/brands/spacific-brand';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';
import { SwipperComponent } from "../../shared/components/swipper/swipper.component";

@Component({
  selector: 'app-brands',
  imports: [CarouselModule, Dialog, ButtonModule, InputTextModule, RouterLink, SwipperComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BrandsComponent implements OnInit {
  private brandsService = inject(BrandsService)
  brandsData: Brand[] | null = null
  spacificBrandData: SpacificBrand | null = null
  visible: boolean = false;

  ngOnInit(): void {
    this.callAllBrands()

  }
  callAllBrands() {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brandsData = res.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  ShowBrandDetails(id: string) {
    this.brandsService.getSpacificBrand(id).subscribe(
      {
        next: (res) => {
          this.spacificBrandData = res.data
          console.log(this.spacificBrandData);
          this.showDialog()
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }
  showDialog() {
    this.visible = true;
  }
  // customOptions1: OwlOptions = {
  //   loop: true,
  //   margin: 20,
  //   mouseDrag: false,
  //   touchDrag: false,
  //   pullDrag: false,
  //   autoplay: true,
  //   smartSpeed: 300,
  //   autoplaySpeed: 100,
  //   rtl: true,
  //   dots: false,
  //   navSpeed: 700,
  //   navText: ['', ''],
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     400: {
  //       items: 2
  //     },
  //     740: {
  //       items: 3
  //     },
  //     940: {
  //       items: 10
  //     }
  //   },
  //   nav: false
  // }
  customOptions2: OwlOptions = {
    loop: true,
    margin: 20,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,

    rtl: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 20
      }
    },
    nav: false
  }
  // customOptions3: OwlOptions = {
  //   loop: true,
  //   margin: 20,
  //   mouseDrag: false,
  //   touchDrag: false,
  //   pullDrag: false,
  //   autoplay: true,
  //   rtl: true,
  //   dots: false,
  //   navSpeed: 700,
  //   navText: ['', ''],
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     400: {
  //       items: 2
  //     },
  //     740: {
  //       items: 3
  //     },
  //     940: {
  //       items: 10
  //     }
  //   },
  //   nav: false
  // }

}
