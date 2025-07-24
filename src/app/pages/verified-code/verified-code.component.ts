import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputOtp } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { IVerifyCodeResponse } from '../../shared/interfaces/varify-code/iverify-code-response';
import { Subscription } from 'rxjs';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-verified-code',
  imports: [ReactiveFormsModule, FormsModule, InputOtp, Toast],
  providers: [MessageService],
  templateUrl: './verified-code.component.html',
  styleUrl: './verified-code.component.scss'
})
export class VerifiedCodeComponent {
  private authService = inject(AuthService)
  private messageService = inject(MessageService)

  private router = inject(Router)
  verifySubscripion!: Subscription
  isLoading: boolean = false
  errorMessage: string = ''
  verifyFormObject: FormGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required, Validators.minLength(6)])
  })
  // * function that handle the form submit and call the end point
  sendRequist(): void {
    if (this.verifyFormObject.valid) {
      this.isLoading = true
      this.verifySubscripion = this.authService.verifyCode(this.verifyFormObject.value).subscribe({
        next: () => {
          this.isLoading = false
          this.showSuccessMessage()
          setTimeout(() => {
            this.router.navigate(['/ChangePassword'])
          }, 2000);
        },
        error: (err) => {
          this.isLoading = false
          this.errorMessage = err.error?.message
          this.showErrorMessage()
        }
      })
    }
  }
  showSuccessMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success Message',
      detail: "Verify Code Is Success",
    })
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
