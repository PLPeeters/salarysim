import { TestBed } from '@angular/core/testing';

import { FormattingService } from './formatting.service';
import { getTranslocoModule } from '../transloco-testing.module';
import { TranslocoService } from '@jsverse/transloco';


describe('FormattingService', () => {
  let service: FormattingService;
  let translocoService: TranslocoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoModule()]
    }).compileComponents();
    service = TestBed.inject(FormattingService);
    translocoService = TestBed.inject(TranslocoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should format amounts differently when switching locales', () => {
    translocoService.setActiveLang('fr');
    expect(service.formatAmount(2000)).toEqual('2 000,00 €');

    translocoService.setActiveLang('nl');
    expect(service.formatAmount(2000)).toEqual('€ 2.000,00');

    translocoService.setActiveLang('en');
    expect(service.formatAmount(2000)).toEqual('€2.000,00');
  });

  it('should format percentages differently when switching locales', () => {
    translocoService.setActiveLang('fr');
    expect(service.formatPct(50)).toEqual('50.00 %');

    translocoService.setActiveLang('nl');
    expect(service.formatPct(50)).toEqual('50.00%');

    translocoService.setActiveLang('en');
    expect(service.formatPct(50)).toEqual('50.00%');
  });

  it('should format relative percentages differently when switching locales', () => {
    translocoService.setActiveLang('fr');
    expect(service.formatPctRelative(50)).toEqual('+50.00 %');

    translocoService.setActiveLang('nl');
    expect(service.formatPctRelative(50)).toEqual('+50.00%');

    translocoService.setActiveLang('en');
    expect(service.formatPctRelative(50)).toEqual('+50.00%');
  });
});
