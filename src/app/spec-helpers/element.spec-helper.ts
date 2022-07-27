import {ComponentFixture} from "@angular/core/testing";
import {By} from "@angular/platform-browser";


/* Find By Test ID */
export function findEl<T>(fixture: ComponentFixture<T>, testId: string) {
 return fixture.debugElement.query(
   By.css(`[data-testid="${testId}"]`)
 );
}

/* Make Click Event */
export function makeClickEvent(target: EventTarget): Partial<MouseEvent> {
  return {
    preventDefault(): void {},
    stopPropagation(): void {},
    stopImmediatePropagation(): void {},
    type: 'click',
    target,
    currentTarget: target,
    bubbles: true,
    cancelable: true,
    button: 0
  };
}

/* Action Click */
export function click<T>(fixture: ComponentFixture<T>, testId: string) {
  const element = findEl(fixture, testId);
  const event = makeClickEvent(element.nativeElement);
  element.triggerEventHandler('click', event);
}

/* Expect element textContext */
export function expectText<T>(fixture:ComponentFixture<T>,testId:string, text: string) {
  const element = findEl(fixture, testId);
  const actualText = element.nativeElement.textContent;
  expect(actualText).toBe(text);
}

function dispatchFakeEvent(element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, string: string, boolean: boolean) {

}

export function setFieldElementValue(
  element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  value: string,
): void {
  element.value = value;
  const isSelect = element instanceof HTMLSelectElement;
  dispatchFakeEvent(element, isSelect ? 'change' : 'input', isSelect ? false : true);
}

export function setFieldValue<T>(fixture: ComponentFixture<T>, testId: string, value: string) {
  setFieldElementValue(findEl(fixture,testId).nativeElement, value);
}
