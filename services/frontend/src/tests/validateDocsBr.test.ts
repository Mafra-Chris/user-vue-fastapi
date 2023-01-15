import { describe, expect, test } from 'vitest'
import { isCPF, isPIS } from '../helpers/validateDocsBr';

describe('Should validate CPF', () => {
  test('valid CPF with mask should be true', () => {

    expect(isCPF('059.163.790-13')).toBe(true);
  });
  test('valid CPF without mask should be true', () => {

    expect(isCPF('05916379013')).toBe(true);
  });
  test('all equal characters should be false', () => {

    expect(isCPF('11111111111')).toBe(false);
  });
  test('empty value should be false', () => {

    expect(isCPF('')).toBe(false);
  });
  test('value length less than 11 should be false', () => {

    expect(isCPF('11')).toBe(false);
  });
  test('value length more than 11 should be false', () => {

    expect(isCPF('1234567890000')).toBe(false);
  });


});

describe('Should validate PIS', () => {
  test('valid PIS with mask should be true', () => {

    expect(isPIS('377.42338.51-6')).toBe(true);
  });
  test('valid PIS without mask should be true', () => {

    expect(isPIS('37742338516')).toBe(true);
  });
  test('all equal characters should be false', () => {

    expect(isPIS('11111111111')).toBe(false);
    expect(isPIS('22222222222')).toBe(false);
    expect(isPIS('33333333333')).toBe(false);
    expect(isPIS('44444444444')).toBe(false);
    expect(isPIS('55555555555')).toBe(false);
    expect(isPIS('66666666666')).toBe(false);
    expect(isPIS('77777777777')).toBe(false);
    expect(isPIS('88888888888')).toBe(false);
    expect(isPIS('99999999999')).toBe(false);
    expect(isPIS('00000000000')).toBe(false);
  });
  test('empty value should be false', () => {

    expect(isPIS('')).toBe(false);
  });
  test('value length less than 11 should be false', () => {

    expect(isPIS('11')).toBe(false);
  });
  test('value length more than 11 should be false', () => {

    expect(isPIS('1234567890000')).toBe(false);
  });


});