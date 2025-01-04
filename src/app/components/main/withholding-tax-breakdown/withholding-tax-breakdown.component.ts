import { Component, inject, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { FormattingService } from '../../../services/formatting.service';
import { TaxationResult } from '../../../services/tax-calculator.service';
import { MatTableModule } from '@angular/material/table';
import { TranslocoModule } from '@jsverse/transloco';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-withholding-tax-breakdown',
  imports: [
    MatListModule,
    MatIconModule,
    MatTableModule,
    TranslocoModule,
  ],
  templateUrl: './withholding-tax-breakdown.component.html',
  styleUrl: './withholding-tax-breakdown.component.scss'
})
export class WithholdingTaxBreakdownComponent {
  @Input({required: true}) result!: TaxationResult;
  private formattingService = inject(FormattingService);

  formatAmount = this.formattingService.formatAmount;
  formatPct = this.formattingService.formatPct;
}
