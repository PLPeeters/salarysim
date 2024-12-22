import {
  TranslocoTestingModule,
  TranslocoTestingOptions,
} from '@jsverse/transloco';

import fr from '../assets/i18n/fr.json';
import nl from '../assets/i18n/nl.json';
import en from '../assets/i18n/en.json';

export function getTranslocoModule(options: TranslocoTestingOptions = {}) {
  return TranslocoTestingModule.forRoot({
    langs: { fr, nl, en },
    translocoConfig: {
      availableLangs: ['fr', 'nl', 'en'],
      defaultLang: 'en',
    },
    preloadLangs: true,
    ...options,
  });
}
