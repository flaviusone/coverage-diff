type RecursivePartial<T> = {
  [P in keyof T]?: T[P] | RecursivePartial<T[P]>;
};

export const expectToEqual: <T>(actual: T, expected: T) => void = (
  actual,
  expected
) => {
  expect(actual).toEqual(expected);
};

export const expectToMatchObject: <T extends unknown>(
  ...args: [T, RecursivePartial<T>] | [T[], Array<RecursivePartial<T>>]
) => void = (actual, expected) => {
  expect(actual).toMatchObject(expected);
};
