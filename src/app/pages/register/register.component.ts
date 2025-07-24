import { AuthService } from './../../core/services/auth/auth.service';
import { SignUp } from './../../shared/interfaces/sign-up';
import { Component, inject, OnDestroy, } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { passwordMatch } from './passwordMath';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    FloatLabelModule,
    ReactiveFormsModule,
    Toast,
  ],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {
  // * inject Router to  change path after send responsee and beacame sucess 
  private router = inject(Router)
  // * inject services that call inside api logic 
  private signUpServices = inject(AuthService)
  // * regex for all input in registration  
  constructor(private messageService: MessageService) { }
  regex = {
    namePattern: /^[A-Z][a-z]{3,}$/,
    emailPattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    passwordPattern: / ^[0-9]{3,}$ /,
    phoenPattern: /^01[0125][0-9]{8}$/,


  }
  singupMassageError: string = ''
  isLoading: boolean = false
  singUpScribtion!: Subscription
  // * the object that views the form and all input inside it 
  singupFormObj: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.pattern(this.regex.namePattern)]),
    email: new FormControl("", [Validators.required, Validators.email, Validators.pattern(this.regex.emailPattern)]),
    password: new FormControl("", [Validators.required]),
    rePassword: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required, Validators.pattern(this.regex.phoenPattern)])
  }, { validators: passwordMatch })
  //* function fireing onSubmit the form and call the signup api 
  handelSubmit(): void {
    if (this.singupFormObj.valid) {
      this.isLoading = true
      this.singUpScribtion = this.signUpServices.signUp(this.singupFormObj.value).subscribe({
        next: (response) => {
          this.isLoading = false
          this.showSuccessMassage()
          setTimeout(() => {
            this.router.navigate(['/login'])
          }, 2000);
        },
        error: (err) => {
          this.singupMassageError = err.error?.message
          this.isLoading = false
          this.showErrorMassage()
        }
      })
    }
  }
  // * unsubscripe form the api after leave the component 
  ngOnDestroy(): void {
    // this.singUpScribtion.unsubscribe()
  }
  // *message that show when the response is success 
  showSuccessMassage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Your Registerion completed successfully',
    });
  }
  // ! message that show when the response is error 
  showErrorMassage() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: this.singupMassageError,
      life: 3000,
    });
  }

}
