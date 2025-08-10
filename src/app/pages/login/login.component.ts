import { Message } from 'primeng/message';
import { Component, inject, OnDestroy, PLATFORM_ID, } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserData } from '../../shared/interfaces/user-data';
import { jwtDecode } from 'jwt-decode';
import { SharedvalueService } from '../../core/services/shared/sharedvalue.service';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    FloatLabelModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    Toast
  ],
  providers: [MessageService],

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  private authServices = inject(AuthService)
  private messageService = inject(MessageService)
  private router = inject(Router);
  private ID = inject(PLATFORM_ID)
  loginErrorMessage: string = '';
  isLoading: boolean = false
  logInSubscription!: Subscription
  token: any
  UserData: UserData | null = null
  lonInFormObj: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.pattern('')])
  })
  onSubmit(): void {
    // make  the loading  spinner work in the login button 
    this.isLoading = true
    if (this.lonInFormObj.valid) {
      this.logInSubscription = this.authServices.login(this.lonInFormObj.value).subscribe({
        next: (response) => {
          // stop the loading  spinner in the login button 
          this.isLoading = false;
          localStorage.setItem('userToken', response.token)
          // & call the method that show the success message 
          this.router.navigate(["/home"]);
        },
        error: (err) => {
          this.loginErrorMessage = err.error.message
          // stop the loading  spinner in the login button 
          this.isLoading = false
          // &call the method that show the error message 
          this.showMessageError()
        }
      })
    }
  }
  ngOnDestroy(): void {
    // this.logInSubscription.unsubscribe()
  }
  //* method that show the success message 
  // showMessageSuccess(): void {
  //   this.messageService.add({
  //     severity: 'success',
  //     summary: 'Success Message',
  //     detail: 'You Are Loged In',
  //   })
  // }
  //! method that show the error message 
  showMessageError(): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: this.loginErrorMessage,
      life: 3000,
    })
  }
  sendUserData() {
  }
}
