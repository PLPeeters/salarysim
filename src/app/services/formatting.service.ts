import { inject, Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';


@Injectable({
  providedIn: 'root'
})
export class FormattingService {
  private translocoService = inject(TranslocoService);

  currentLocale: String = '';

  constructor() {
    this.translocoService.langChanges$
      .subscribe(currentLang => {
        this.currentLocale = `${currentLang}-BE`;
      });
  }

  formatAmount(value: any) {
    const options = {
      minimumFractionDigits: 2,
    };

    switch (this.currentLocale) {
      case 'fr-BE':
        return `${value.toLocaleString(this.currentLocale, options)} €`.replace(' ', ' ');
      case 'nl-BE':
        return `€ ${value.toLocaleString(this.currentLocale, options)}`
      default:
        return `€${value.toLocaleString(this.currentLocale, options)}`
    }
  }

  formatPct(value: any) {
    if (this.currentLocale === 'fr-BE') {
      return `${value.toFixed(2).toLocaleString(this.currentLocale)} %`.replace(' ', ' ');
    }

    return `${value.toFixed(2).toLocaleString(this.currentLocale)}%`.replace(' ', ' ');
  }

  formatPctRelative(value: any) {
    if (value > 0) {
      return `+${this.formatPct(value)}`;
    } else {
      return `+${this.formatPct(value)}`;
    }
  }
}
