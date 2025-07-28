import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const successInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap((data) => {
      console.log(data);

    })
  );
};
