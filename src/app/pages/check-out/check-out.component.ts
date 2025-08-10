import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from 'primeng/select';
import { PaymentService } from '../../core/services/payment/payment.service';
import { CartService } from '../../core/services/cart/cart.service';
import { CartData } from '../../shared/interfaces/cart/cart-data';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-check-out',
  imports: [ReactiveFormsModule, FormsModule, InputTextModule, FloatLabel, Select, Toast, RouterLink],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss',
  providers: [MessageService]

})
export class CheckOutComponent implements OnInit {
  private paymentService = inject(PaymentService)
  private router = inject(Router)
  private cartService = inject(CartService)
  private formBuilder = inject(FormBuilder)
  private acitvatedRouter = inject(ActivatedRoute)
  cartData: CartData | null = null
  payType: string | null = null
  cities!: any[]
  fromObj!: FormGroup
  errorMessage: string | null = null
  cartID: string | null = null
  isLoading: boolean = false
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.citiesChange()
    this.callCart()
    this.fromObj = this.formBuilder.group({
      details: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      city: [null, [Validators.required]],
    })
    this.payType = this.acitvatedRouter.snapshot.queryParamMap.get('t')
    this.cartID = this.acitvatedRouter.snapshot.queryParamMap.get('cartId')
    console.log(this.cartData);

  }
  // ? method to genrate cities in select input
  citiesChange(): void {
    this.cities = [
      'Cairo',
      'Giza',
      'Alexandria',
      'Dakahlia',
      'Red Sea',
      'Beheira',
      'Fayoum',
      'Gharbia',
      'Ismailia',
      'Menofia',
      'Minya',
      'Qalyubia',
      'New Valley',
      'Suez',
      'Aswan',
      'Asyut',
      'Beni Suef',
      'Port Said',
      'Damietta',
      'Sharqia',
      'South Sinai',
      'Kafr El Sheikh',
      'Matrouh',
      'Luxor',
      'Qena',
      'North Sinai',
      'Sohag'
    ];
  }
  // * method to call cart api and get the porduct in it 
  callCart(): void {
    this.cartService.getLoggedUerCart().subscribe({
      next: (res) => {
        this.cartData = res.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  // * method to call cart api andupdate toe porduct count 
  updateProductQuinty(id: string, count: any): void {
    this.cartService.updateCartProductQuantity(id, count).subscribe({
      next: (res) => {
        this.cartData = res.data
        this.cartService?.cartProdurctsNumber.set(res.numOfCartItems)
        this.cartService?.productsCartPrice.set(res.data.totalCartPrice)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  // * method to call cart api delete porduct from cart 
  deleteProduct(id: string): void {
    this.cartService.deleteSpecificProduct(id).subscribe(
      {
        next: (res) => {
          this.cartData = res.data
          this.cartService?.cartProdurctsNumber.set(res.numOfCartItems)
          this.cartService?.productsCartPrice.set(res.data.totalCartPrice)
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }
  // ! method to call payment api and go to pay to bank or call api to pay cash 
  onSibmit(id: string, form: FormGroup): void {
    this.isLoading = true
    if (form.valid) {
      if (this.payType == 'visa') {
        this.paymentService.CheckOutSession(id, form.value).subscribe({
          next: (res) => {
            this.isLoading = false

            window.open(res.session.url, '_self')
            console.log(res);
          },
          error: (err) => {
            this.isLoading = false
            this.showError(err.message)
          }
        })
      } else if (this.payType === 'cash') {
        this.paymentService.createCashOrder(id, form.value).subscribe({
          next: (res) => {
            this.isLoading = false
            this.showSuccess()
            if (res.status === "success") {
              setTimeout(() => {
                this.router.navigate(['/allorders'])
              }, 2000);
            }
          },
          error: (err) => {
            this.isLoading = false
            this.showError(err.message)
          }
        })
      } else {
        this.router.navigate(['/cart'])
      }
    }
    if (form.invalid) {
      form.markAllAsTouched()
    }
  }

  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 3000
    });
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Your Order Is Add Success',
      life: 3000
    });
  }
}
