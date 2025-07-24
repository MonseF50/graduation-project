import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headersInterceptor } from './core/interceptors/headers/headers.interceptor';
import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes, withViewTransitions(), withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })),
  provideClientHydration(withEventReplay()),
  provideAnimations(),
  provideAnimationsAsync(),
  provideHttpClient(withFetch(), withInterceptors([headersInterceptor, loadingInterceptor])),
  importProvidersFrom([NgxSpinnerModule], TranslateModule.forRoot(
    {
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }
  )),
  providePrimeNG({
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: false || 'none',
      }
    }
  })
  ]

};
