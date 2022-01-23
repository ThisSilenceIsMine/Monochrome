import { css } from './css';

let h: Function;

interface BaseProps {
  as?: string;
  className?: string;
}

export const setup = (factory: Function) => {
  if (h) return;
  h = factory;
};

export const styled =
  <Props extends BaseProps>(tag: keyof HTMLElementTagNameMap) =>
  (style: TemplateStringsArray) =>
  (props: Props) => {
    if (!h)
      throw new Error(
        'Factory not found. Please, specify it via setup() function'
      );
    const _props = { ...props };
    const styleSheet = style.reduce((prev, curr) => prev + curr);

    _props.className = css(styleSheet);

    let _as = _props.as ?? tag;
    return h(_as, _props);
  };
