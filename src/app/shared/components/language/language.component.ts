import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
interface City {
  name: string;
}
@Component({
  selector: 'app-language',
  imports: [FormsModule, Select,],
  templateUrl: './language.component.html',
  styleUrl: './language.component.scss'
})
export class LanguageComponent implements OnInit {
  private ID = inject(PLATFORM_ID)
  cities: City[] | undefined;

  selectedCity: City | undefined;

  ngOnInit() {
    this.getLanguage()
  }
  getLanguage() {
    this.cities = [
      { name: 'English' },
      { name: 'Arabic' },
    ];
  }
}
