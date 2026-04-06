import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraphConfigFieldComponent } from './graph-config-field.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('GraphConfigFieldComponent', () => {
  let component: GraphConfigFieldComponent;
  let fixture: ComponentFixture<GraphConfigFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphConfigFieldComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(GraphConfigFieldComponent);
    component = fixture.componentInstance;
    component.label = 'Start';
    component.value = 2154.11;
    component.currentLocale = 'en-BE';
    component.showStepper = true;
    fixture.detectChanges();
  });

  it('should emit increment when pressing the up arrow', () => {
    const incrementSpy = jasmine.createSpy('increment');
    component.increment.subscribe(incrementSpy);

    component.onArrowKeyDown({ preventDefault: () => undefined } as Event, 1);

    expect(incrementSpy).toHaveBeenCalled();
  });

  it('should emit decrement when pressing the down arrow', () => {
    const decrementSpy = jasmine.createSpy('decrement');
    component.decrement.subscribe(decrementSpy);

    component.onArrowKeyDown({ preventDefault: () => undefined } as Event, -1);

    expect(decrementSpy).toHaveBeenCalled();
  });

  it('should emit the raw input value on blur even when it is below min', () => {
    const blurredSpy = jasmine.createSpy('blurred');
    component.blurred.subscribe(blurredSpy);
    const input = { valueAsNumber: 2000, value: '2000' } as HTMLInputElement;

    component.onBlur({ target: input } as unknown as Event);

    expect(blurredSpy).toHaveBeenCalledWith(input);
  });
});
