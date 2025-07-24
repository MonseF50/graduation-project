import { HttpInterceptorFn } from '@angular/common/http';

export const erroresInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
