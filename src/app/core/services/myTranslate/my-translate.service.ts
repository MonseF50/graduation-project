import { isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {
  currentlang = new BehaviorSubject<string>('')

  constructor(private translateService: TranslateService, @Inject(PLATFORM_ID) private Id: Object) {
    // this.renderer = rendererFactory.createRenderer(null, null);
    if (isPlatformBrowser(this.Id)) {
      // Set Default Language in the applictaion
      this.translateService.setDefaultLang('en')
      // get saved language form localStorage
      let savedLang = localStorage.getItem('lang')
      // use the language

      if (savedLang != null) {
        this.translateService.use(savedLang)
      }
    }
    // to chage direcation 
    this.changeDirection()
  }


  changeDirection(): void {
    const html = document.documentElement
    if (localStorage.getItem('lang') === 'en') {
      html.setAttribute('lang', 'en')
      html.setAttribute('dir', 'ltr')
    } else if (localStorage.getItem('lang') === 'ar') {
      html.setAttribute('lang', 'ar')
      html.setAttribute('dir', 'rtl')
    }
  }
  changLang(lang: string) {
    // save localStorage == lang 
    localStorage.setItem('lang', lang)
    // use lang
    this.currentlang.next(lang)
    this.translateService.use(lang)
    // change direcation
    this.changeDirection()
  }
}
