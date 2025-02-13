export type FontWeight =
  | 'thin'
  | 'extralight'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

export type FontFamily = 'urbanist';

export type FontVariant = `${FontFamily}-${FontWeight}`;
