import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { MyTranslateService } from '../../../core/services/myTranslate/my-translate.service';
import { concatWith } from 'rxjs';
interface City {
  name: string;
  code: string
}
@Component({
  selector: 'app-language',
  imports: [FormsModule, Select,],
  templateUrl: './language.component.html',
  styleUrl: './language.component.scss'
})
export class LanguageComponent implements OnInit {
  private ID = inject(PLATFORM_ID)
  private myTranslateService = inject(MyTranslateService)
  cities: City[] | undefined;

  selectedlang: City | undefined;

  ngOnInit() {
    this.getLanguage()
  }
  getLanguage() {
    this.cities = [
      { name: 'English', code: 'en' },
      { name: 'العربية', code: 'ar' },
    ];
  }
  onLanguageChange(city: City) {
    this.changeLang(city.code)
  }

  changeLang(lang: string) {
    this.myTranslateService.changLang(lang);
  }
}
