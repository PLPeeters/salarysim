import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@jsverse/transloco';
import { GetLangParams, provideTranslocoPersistLang } from '@jsverse/transloco-persist-lang';


const AVAILABLE_LANGS = ['fr', 'nl', 'en'];

function getMatchingLang(langCode: string, defaultLang: string): string {
  for (let lang of AVAILABLE_LANGS) {
    if (lang === langCode || langCode.startsWith(lang)) {
      return lang;
    }
  }

  return defaultLang;
}

export function getLangFn({
  cachedLang,
  browserLang,
  cultureLang,
  defaultLang,
}: GetLangParams): string {
  if (cachedLang != null) {
    return cachedLang;
  }

  if (browserLang != null) {
    return getMatchingLang(browserLang, defaultLang);
  }

  if (cultureLang != null) {
    return getMatchingLang(cultureLang, defaultLang);
  }

  return defaultLang;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom([BrowserAnimationsModule]),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: AVAILABLE_LANGS,
        defaultLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader
    }),
    provideTranslocoPersistLang({
      getLangFn,
      storage: {
        useValue: localStorage,
      },
    }),
  ]
};
