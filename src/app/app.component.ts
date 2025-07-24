import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ToastService } from './core/services/toast/toast.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService]

})
export class AppComponent {
  title = 'e-commerce';
  constructor(private messageService: MessageService, private toastService: ToastService) { }
}
