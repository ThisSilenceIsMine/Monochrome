import { css } from './css';
import { compile } from './core/compile';
import domElements from './lib/domElements';
import type { Props, Interpolation, HTMLTag, Theme, ThemeProvider, CreateElement } from './lib/types';

let h: CreateElement;
let useTheme: ThemeProvider;

export const setup = (factory: CreateElement, useTheme?: ThemeProvider) => {
  if (h) return;
  h = factory;
  if(useTheme) useTheme = useTheme;
};

export const baseStyled =
  (tag: HTMLTag | any) =>
  <T extends {}>(
    style: TemplateStringsArray,
    ...expressions: Interpolation<T>[]
  ) =>
  (props: Props<T>) => {
    if (!h)
      throw new Error(
        'Factory not found. Please, specify it via setup() function'
      );
    const _props = { ...props };
    const styleSheet = compile<T>(style, expressions, _props);

    _props.className = [props.className, css(styleSheet)].join(' ');

    let _as = _props.as ?? tag;
    return h(_as, _props);
  };

type BaseStyled = typeof baseStyled;

export const styled = baseStyled as BaseStyled & {
  [key in typeof domElements[number]]: ReturnType<BaseStyled>;
};

domElements.forEach((domElement) => {
  styled[domElement] = baseStyled(domElement);
});
