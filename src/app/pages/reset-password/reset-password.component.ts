import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { FloatLabelModule } from "primeng/floatlabel"
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, FloatLabelModule, InputTextModule, Toast],
  providers: [MessageService],
  templateUrl: './reset-password.component.html',

  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  private authServices = inject(AuthService)
  private router = inject(Router)
  errorMessage: string = '';
  isLoading: boolean = false
  private messageService = inject(MessageService)

  changePassword: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{3,}$/)])
  })
  formSumbit(): void {
    this.isLoading = true
    this.authServices.restPassword(this.changePassword.value).subscribe({
      next: (res) => {
        this.isLoading = false
        this.showSuccessMessage()
        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 2000);
      },
      error: (err) => {
        this.isLoading = false
        this.errorMessage = err.error.message
        this.showErrorMessage()
      }
    })
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
