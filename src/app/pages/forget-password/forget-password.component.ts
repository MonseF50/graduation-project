import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from "primeng/floatlabel"
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule,
    Toast,
    FloatLabelModule,
    InputTextModule,
    FormsModule,],
  providers: [MessageService],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  private authServices = inject(AuthService)
  private router = inject(Router)
  private messageService = inject(MessageService)
  isLoading: boolean = false
  errorMessage: string = ''
  forgetFormObj: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email])
  })
  // * function that handle the form submit and call the end point
  sendRequist(): void {
    if (this.forgetFormObj.valid) {
      this.isLoading = true;
      this.authServices.forgetPassword(this.forgetFormObj.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.router.navigate(['/VerifyCode'])
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message
          this.showErrorMessage()
        }
      })
    }
  }
  showErrorMessage() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: this.errorMessage,
      life: 3000,
    })
  }
}
