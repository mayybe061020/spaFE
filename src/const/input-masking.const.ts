/**
 * masking regex for input phone.
 * An array which each field is a regex specifies the allowed entered character.
 *
 * By default, this allows entering upto 10 numbers, with 0 at beginnings.
 */
export const PhoneNumberMask = [
  "0",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];
