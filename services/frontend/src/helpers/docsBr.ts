import { allEqual } from "./strings";
export function isCPF(value: string) {
  if (typeof value !== 'string') {
    return false;
  }

  value = value.replace(/[^\d]+/g, '');

  if (value.length !== 11 || !!value.match(/(\d)\1{10}/)) {
    return false;
  }

  if (allEqual(value)) {
    return false
  }

  const values = value.split('').map(el => +el);
  const rest = (count: number) => (values.slice(0, count - 12).reduce((sum, el, index) => (sum + el * (count - index)), 0) * 10) % 11 % 10;

  return rest(10) === values[9] && rest(11) === values[10];
}

export function isPIS(pis: string) {
  let multiBase = "3298765432";
  let total = 0;
  let rest = 0;
  let multiplying = 0;
  let multiplier = 0;
  let digit = 99;

  let numPIS = pis.replace(/[^\d]+/g, '');

  if (numPIS.length !== 11 || allEqual(numPIS)) {
    return false;
  } else {
    for (let i = 0; i < 10; i++) {
      multiplying = parseInt(numPIS.substring(i, i + 1));
      multiplier = parseInt(multiBase.substring(i, i + 1));
      total += multiplying * multiplier;
    }

    rest = 11 - total % 11;
    rest = rest === 10 || rest === 11 ? 0 : rest;

    digit = parseInt("" + numPIS.charAt(10));
    return rest === digit;
  }
}
