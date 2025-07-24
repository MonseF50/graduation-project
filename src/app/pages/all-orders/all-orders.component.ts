import { Component, inject, OnInit } from '@angular/core';
import { SharedvalueService } from '../../core/services/shared/sharedvalue.service';
import { UserData } from '../../shared/interfaces/user-data';
import { PaymentService } from '../../core/services/payment/payment.service';
import { AccordionModule } from 'primeng/accordion';
import { AllOrders } from '../../shared/interfaces/allorders/all-orders';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-all-orders',
  imports: [AccordionModule, CarouselModule, NgFor, NgIf, NgClass],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent implements OnInit {
  private sharedvalueService = inject(SharedvalueService)
  private paymentService = inject(PaymentService)
  UserData: UserData | null = null
  allOrdersData: AllOrders[] | null = null
  ngOnInit(): void {
    this.UserData = this.sharedvalueService.userData;
    this.callAllOrders(this.UserData?.id!)
  }

  callAllOrders(id: string) {
    if (this.UserData?.id) {
      this.paymentService.getUserAllOrders(id).subscribe({
        next: (res) => {
          this.allOrdersData = res
          console.log(this.allOrdersData);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }
  getStarArray(rating: number): boolean[] {
    const fullStars = Math.round(rating);
    const maxStars = 5;
    const result: boolean[] = [];

    for (let i = 1; i <= maxStars; i++) {
      result.push(i <= fullStars);
    }

    return result;
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
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
        items: 4
      }
    },
    nav: false
  }
}
