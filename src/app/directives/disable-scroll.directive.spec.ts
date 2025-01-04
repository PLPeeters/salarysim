import { Component } from '@angular/core';
import { DisableScrollDirective } from './disable-scroll.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';


@Component({
  standalone: true,
  imports: [DisableScrollDirective],
  template: `<input type="number" />`
})
class TestComponent { }

describe('DisableScrollDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges(); // Trigger initial data binding

    inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
  });

  it('should create an instance', () => {
    const directive = new DisableScrollDirective();
    expect(directive).toBeTruthy();
  });

  it('should blur the input element on wheel event', () => {
    // Spy on the blur method
    const blurSpy = spyOn(inputElement, 'blur');

    // Dispatch a wheel event
    const wheelEvent = new WheelEvent('wheel');
    inputElement.dispatchEvent(wheelEvent);

    // Assert that blur was called
    expect(blurSpy).toHaveBeenCalled();
  });
});
