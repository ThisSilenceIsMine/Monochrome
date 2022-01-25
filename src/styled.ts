import { css } from './css';
import { compile } from './core/compile';
import type { Props, Interpolation } from './lib/types';
let h: Function;

export const setup = (factory: Function) => {
  if (h) return;
  h = factory;
};

export const styled =
  <UserProps>(tag: keyof HTMLElementTagNameMap) =>
  (style: TemplateStringsArray, ...expressions: Interpolation<UserProps>[]) =>
  (props: Props<UserProps>) => {
    if (!h)
      throw new Error(
        'Factory not found. Please, specify it via setup() function'
      );
    const _props = { ...props };
    const styleSheet = compile<UserProps>(style, expressions, _props);

    _props.className = css(styleSheet);

    let _as = _props.as ?? tag;
    return h(_as, _props);
  };
