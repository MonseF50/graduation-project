import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const noauthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const Id = inject(PLATFORM_ID)
  if (isPlatformBrowser(Id)) {
    if (!localStorage.getItem('userToken')) {
      router.navigate(['/login'])
      return false
    }
    else {
      return true
    }
  }
  return false
};
