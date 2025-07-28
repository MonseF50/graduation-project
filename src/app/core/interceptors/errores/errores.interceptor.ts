import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TosterngService } from '../../services/toster/tosterng.service';
import { catchError, throwError } from 'rxjs';

export const erroresInterceptor: HttpInterceptorFn = (req, next) => {
  const tosterngService = inject(TosterngService)
  return next(req).pipe(
    catchError((err) => {
      tosterngService.showError(err.error.message)
      return throwError(() => err)
    })
  );
};
