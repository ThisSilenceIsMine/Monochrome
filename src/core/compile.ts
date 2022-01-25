import { Interpolation } from '../lib/types';
export const compile = <P>(
  styles: TemplateStringsArray,
  defs: Interpolation<P>[],
  props: P
) => {
  return styles.reduce((out, next, i) => {
    let tail: any = defs[i];
    let res: string | null = null;
    if (tail && typeof tail === 'function') {
      res = tail.call({}, props);
    }

    return out + next + (res ?? tail ?? '');
  }, '');
};
