import { describe, expect, test } from 'vitest'

import { allEqual, capitalizeFirstLetter, maskCEP, maskCPF, maskPIS } from "../helpers/strings";

describe('Receives a string and capitalize first letter of each word', () => {
  test('capitalized equals to Hello World!', () => {
    let capitalized = capitalizeFirstLetter('hello world!')

    expect(capitalized).toBe('Hello World!');
  });
  test('capitalized equals to Capitalize', () => {
    let capitalized = capitalizeFirstLetter('capitalize')

    expect(capitalized).toBe('Capitalize');
  });
  test('capitalized equals to  ""', () => {
    let capitalized = capitalizeFirstLetter('')

    expect(capitalized).toBe('');
  });

});

describe('Receives a string and masks to CPF pattern', () => {
  test('maskes equals to 372.444.680-24', () => {
    let masked = maskCPF('37244468024')

    expect(masked).toBe('372.444.680-24');
  });


});
describe('Receives a string and masks to PIS pattern', () => {
  test('masked equals to 913.66835.66-5', () => {
    let masked = maskPIS('91366835665')

    expect(masked).toBe('913.66835.66-5');
  });


});
describe('Receives a string and masks to CEP pattern', () => {
  test('masked equals to 78553-637', () => {
    let masked = maskCEP('78553637')

    expect(masked).toBe('78553-637');
  });


});

describe('Receives a string and check if all chars are equal', () => {
  test('aaa should be true', () => {


    expect(allEqual('aaa')).toBe(true);
  });
  test('aaba should be false', () => {


    expect(allEqual('aaba')).toBe(false);
  });
  test('"" should be false', () => {


    expect(allEqual('')).toBe(false);
  });
  test('Hello World should be false', () => {


    expect(allEqual('Hello World')).toBe(false);
  });



});