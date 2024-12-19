import {TranslocoGlobalConfig} from '@jsverse/transloco-utils';

const config: TranslocoGlobalConfig = {
  rootTranslationsPath: 'src/assets/i18n/',
  langs: [ 'fr', 'nl', 'en' ],
  defaultLang: 'en',
  keysManager: {},
};

export default config;
