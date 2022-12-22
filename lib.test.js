/// <reference types="jest" />

import {
  arePasswordsEqual,
  containsNumbers,
  hasLowerCaseLetters,
  hasUpperCaseLetters,
  reachesMinimumLength,
} from "./src/lib";

test("arePasswordEqual should return false when passwords are not equal", () => {
  const result = arePasswordsEqual("abc", "123");
  expect(result).toBe(true);
});
test("arePasswordEqual should return true when passwords are equal", () => {
  const result = arePasswordsEqual("abc", "abc");
  expect(result).toBe(true);
});
test("containsNumbers should return false when password 1 doesn't contain a number", () => {
  const result = containsNumbers("test");
  expect(result).toBe(false);
});
test("containsNumbers should return true when password 1 contains a number", () => {
  const result = containsNumbers("test1");
  expect(result).toBe(true);
});
test("hasLowerCaseLetters should return false when password 1 doesn't have a lower case letter", () => {
  const result = hasLowerCaseLetters("TEST");
  expect(result).toBe(false);
});
test("hasLowerCaseLetters should return true when password 1 has a lower case letter", () => {
  const result = hasLowerCaseLetters("TESt");
  expect(result).toBe(true);
});
test("hasUpperCaseLetters should return false when password 1 doesn't have an uppper case letter", () => {
  const result = hasUpperCaseLetters("test");
  expect(result).toBe(false);
});
test("hasUpperCaseLetters should return true when password 1 has a lower case letter", () => {
  const result = hasUpperCaseLetters("Test");
  expect(result).toBe(true);
});
test("reachesMinimumLength should return false when password 1 is shorter than 10 characters", () => {
  const result = reachesMinimumLength("123456789");
  expect(result).toBe(false);
});
test("reachesMinimumLength should return true when password 1 is at least 10 characters long", () => {
  const result = reachesMinimumLength("12345678910");
  expect(result).toBe(true);
});
