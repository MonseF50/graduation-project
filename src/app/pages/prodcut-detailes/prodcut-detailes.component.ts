import { Component, ElementRef, HostListener, Inject, inject, OnDestroy, OnInit, Renderer2, viewChild, ViewChild, } from '@angular/core';
import { IProducts } from '../../shared/interfaces/iproducts';
import { ActivatedRoute, withComponentInputBinding } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { modalBackdrop } from 'flowbite';
import { trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart/cart.service';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-prodcut-detailes',
  imports: [CommonModule, TabsModule, FormsModule, TextareaModule, FloatLabel, Toast],
  templateUrl: './prodcut-detailes.component.html',
  styleUrl: './prodcut-detailes.component.scss',
  providers: [MessageService]

})
export class ProdcutDetailesComponent implements OnInit, OnDestroy {
  @ViewChild('baseImage') baseImage!: ElementRef<HTMLElement>
  @ViewChild('wishList') wishList!: ElementRef<HTMLElement>
  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService)
  private renderer2 = inject(Renderer2)
  private cartService = inject(CartService)
  private messageService = inject(MessageService)
  productDetailesSubscribtion!: Subscription
  productId: string | number | null = null;
  productDetails: IProducts | null = null
  imgSRC: string | null = null
  isProductInWichList: boolean = false
  callActivateRouterAndCallProductDetailes(): void {
    // * call the services of  activateRouter to send the product data in the path 
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.productId = res.get('productId')
        //* call the api of the spacific porduct 
        this.productDetailesSubscribtion = this.productsService.getSpecificProducts(this.productId!).subscribe({
          next: (res) => {
            this.productDetails = res.data
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    })
  }
  ngOnInit(): void {
    this.callActivateRouterAndCallProductDetailes()
  }
  // * method to get the number of product rating stars 
  numberOfStarts(): string[] {
    const rate = Math.floor(Number(this.productDetails?.ratingsAverage))
    if (!isFinite(rate) || rate <= 0) {
      return [];
    }
    return Array(rate).fill('')
  }
  // goldStart(event: MouseEvent) {
  //   const element = event.currentTarget as HTMLElement
  //   const elemetnStars = Array.from(element.querySelectorAll('i'))
  //   console.log(elemetnStars);
  //   elemetnStars.forEach(ele => {
  //     ele.style.color = '#fbbf24'
  //   });
  // }
  // * method to change the color of the star
  goldStart(event: MouseEvent) {
    const clickedElement = event.currentTarget as HTMLElement;

    // لو هو بالفعل فيه الكلاس → نشيله ونرجع
    if (clickedElement.classList.contains('gold-stars')) {
      clickedElement.classList.remove('gold-stars');

      // ترجع النجوم للون الرمادي
      clickedElement.querySelectorAll('i').forEach(star => {
        (star as HTMLElement).style.color = '#66666630';
      });

      return;
    }
    // نشيل الكلاس من كل العناصر التانية اللي عندها الكلاس
    const allRatingBoxes = document.querySelectorAll('.gold-stars');
    allRatingBoxes.forEach(box => {
      box.classList.remove('gold-stars');
      box.querySelectorAll('i').forEach(star => {
        (star as HTMLElement).style.color = '#66666630';
      });
    });

    // نحط الكلاس على العنصر اللي اتكلك عليه
    clickedElement.classList.add('gold-stars');
    clickedElement.querySelectorAll('i').forEach(star => {
      (star as HTMLElement).style.color = '#fbbf24';
    });
  }
  // * method to change the product image
  changeImage(event: MouseEvent): void {
    const image = event.target as HTMLElement
    const imageSrc = image.getAttribute('src');
    this.imgSRC = imageSrc
  }
  // * method to reset the variables to get the base image
  resetImageSRC(): void {
    this.imgSRC = null
  }
  //& method to add product to wichlist and remove it form the wishlist
  wishListProduct(event: MouseEvent): void {
    const element = event.currentTarget as HTMLElement
    const icon = element.children[0]
    element.classList.toggle('bg-primary!')
    icon.classList.toggle('text-white')
  }
  ngOnDestroy(): void {
    this.productDetailesSubscribtion.unsubscribe()
  }
  //& method to add product to cart
  addProductCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.showSuccessMessage(res.message)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  showSuccessMessage(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
      life: 3000
    });
  }
} 
