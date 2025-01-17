import { Movie } from './movie';
import { Show } from './show';

export type Title =
  | ({
      type: 'movie';
    } & Movie)
  | ({
      type: 'show';
    } & Show);
