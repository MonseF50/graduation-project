import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const Id = inject(PLATFORM_ID)
  const router = inject(Router)
  if (isPlatformBrowser(Id)) {
    if (!localStorage.getItem('userToken')) {
      return true
    } else {
      router.navigate(['/home'])
      return false
    }
  }
  return false
};
