export function validateStyle(isInvalid: boolean, isDirty: boolean) {
  return isInvalid && isDirty
    ? 'border border-red-500 focus:ring-1 focus:ring-red-500'
    : '';
}

export function delayTouch(validate: any, touchMap: WeakMap<object, any>) {
  validate.$reset();
  if (touchMap.has(validate)) {
    clearTimeout(touchMap.get(validate));
  }
  touchMap.set(validate, setTimeout(validate.$touch, 500));
}