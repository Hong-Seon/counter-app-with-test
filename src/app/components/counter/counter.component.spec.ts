import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterComponent } from './counter.component';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {click, expectText, findEl, setFieldValue} from "../../spec-helpers/element.spec-helper";

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let debugElement: DebugElement;

  const startCount = 0;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[],
      declarations: [ CounterComponent ],
      providers:[]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.startCount = startCount;
    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the start count', () => {
    expectText(fixture, 'count', String(startCount));
  });

  it('increments the count', () => {
    // Act: click on the increment button
    const incrementButton = debugElement.query(
      By.css('[data-testid="increment-button"]')
    );
    incrementButton.triggerEventHandler('click',null);

    /* Re-render the component*/
    fixture.detectChanges();
    // Assert: Expect that the displayed count now reads "1",
    const countOutput = debugElement.query(
      By.css('[data-testid="count"]')
    );
    expect(countOutput.nativeElement.textContent).toBe(String(startCount + 1));
  });

  it('decrement the count' ,() => {
    // Act: click on the decrement button
    click(fixture, 'decrement-button');
    // Re-render the Component
    fixture.detectChanges();
    // Assert;
    expectText(fixture, 'count',String(startCount - 1));
  });

  it('resets the count', () => {
    const newCount = '123';
    // Act
    const resetInputEl = findEl(fixture, 'reset-input').nativeElement;
    // Set field value;
    resetInputEl.value = newCount;
    // Dispatch input event
    const event = document.createEvent('Event');
    event.initEvent('input', true, false);
    resetInputEl.dispatchEvent(event);

    // Click on reset button
    click(fixture, 'reset-button');
    // Re-render the Component
    fixture.detectChanges();

    // Assert
    expectText(fixture, 'count', newCount);
  });
  it('does not reset if the value is not a number', () => {
    const value = 'not a number';

    // Act
    setFieldValue(fixture, 'reset-input', value);
    click(fixture, 'reset-button');
    fixture.detectChanges();

    // Assert
    expectText(fixture, 'count', String(startCount));
  });
});
