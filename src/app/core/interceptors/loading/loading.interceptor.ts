import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const ngxSpinnerService = inject(NgxSpinnerService)
  // that show loading screen in the project
  ngxSpinnerService.show()




  // that hide loading screen from the project
  return next(req).pipe(finalize(() => {
    ngxSpinnerService.hide()

  }));
};
