import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithholdingTaxBreakdownComponent } from './withholding-tax-breakdown.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getTranslocoModule } from '../../../transloco-testing.module';
import { Component, inject } from '@angular/core';
import { TaxCalculatorService } from '../../../services/tax-calculator.service';
import { simpleEmployee } from '../../../services/data/2024-inputs-to-net';


@Component({
  standalone: true,
  imports: [WithholdingTaxBreakdownComponent],
  template: `<app-withholding-tax-breakdown [result]="result"></app-withholding-tax-breakdown>`,
})
class TestHostComponent {
  private taxCalculatorService = inject(TaxCalculatorService);
  result = this.taxCalculatorService.calculateTaxation({ ...simpleEmployee, grossSalary: 10000});
}


describe('WithholdingTaxBreakdownComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, getTranslocoModule(), BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
