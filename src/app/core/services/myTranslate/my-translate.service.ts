import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'
@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {
  private ID = inject(PLATFORM_ID)
  constructor(private translateService: TranslateService) {
    // Set Default Language in the applictaion
    this.translateService.setDefaultLang('en')
    // get saved language form localStorage
    let savedLang = localStorage.getItem('lang')
    if (isPlatformBrowser(this.ID)) {
      if (localStorage.getItem('lnag') != null) {
        this.translateService.use(savedLang!)
      }
    }
    this.changeDirection()
  }


  changeDirection(): void {
    if (localStorage.getItem('lang') === 'en') {
      document.documentElement.setAttribute('dir', 'ltr')
      document.documentElement.setAttribute('lang', 'en')
    } else if (localStorage.getItem('lang') === 'ar') {
      document.documentElement.setAttribute('dir ', 'rtl')
      document.documentElement.setAttribute('lang', 'ar')
    }
  }
  changLang(lang: string) {
    localStorage.setItem('lang', lang)
    this.translateService.use(lang)
    this.changeDirection()
  }
}
