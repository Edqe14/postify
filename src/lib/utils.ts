import Sqids from 'sqids';

export const parseNumber = (value: string | null | undefined, def = 0) => {
  return Number.parseInt(value ?? '0') || def;
};

export const inOption = <T>(value: T, options: T[]) => {
  return options.includes(value) ? value : options[0];
};

export const idEncoder = new Sqids({
  minLength: 12,
});
