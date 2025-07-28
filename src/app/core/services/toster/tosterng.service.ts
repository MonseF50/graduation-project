import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class TosterngService {

  constructor(private messageService: MessageService) { }

  showSuccess(summary: string, detail: string = '') {
    this.messageService.add({ severity: 'success', summary, detail });
  }

  showError(summary: string, detail: string = '') {
    this.messageService.add({ severity: 'error', summary, detail });
  }

  showInfo(summary: string, detail: string = '') {
    this.messageService.add({ severity: 'info', summary, detail });
  }

  showWarning(summary: string, detail: string = '') {
    this.messageService.add({ severity: 'warn', summary, detail });
  }
}
