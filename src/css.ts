import { hash } from './core/hash';
import { appendStyles } from './core/appendStyles';

export const css = (styleString: string) => {
  const className = 'ms-' + hash(styleString);
  appendStyles(className, styleString);
  return className;
};
