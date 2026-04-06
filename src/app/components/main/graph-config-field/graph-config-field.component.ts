import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-graph-config-field',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './graph-config-field.component.html',
  styleUrl: './graph-config-field.component.scss',
})
export class GraphConfigFieldComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: number;
  @Input({ required: true }) currentLocale!: string;
  @Input() inputStep: number | string = 'any';
  @Input() minValue: number | null = null;
  @Input() showStepper = false;
  @Input() disableDecrement = false;

  @Output() valueChange = new EventEmitter<number>();
  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();
  @Output() blurred = new EventEmitter<HTMLInputElement>();

  onValueInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const nextValue = input.valueAsNumber;

    if (Number.isNaN(nextValue)) {
      return;
    }

    this.valueChange.emit(nextValue);
  }

  onBlur(event: Event) {
    const input = event.target as HTMLInputElement;
    this.blurred.emit(input);
  }

  onArrowKeyDown(event: Event, stepDirection: -1 | 1) {
    if (!this.showStepper) {
      return;
    }

    event.preventDefault();

    if (stepDirection > 0) {
      this.increment.emit();
      return;
    }

    this.decrement.emit();
  }

  onStepperMouseDown(event: MouseEvent) {
    event.preventDefault();
  }
}
