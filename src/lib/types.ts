import domElements from './domElements';
interface BaseProps {
  className?: string;
  as?: string;
  children?: any;
}

export type Props<T> = T & BaseProps;

export type Interpolation<T> = ((props: Props<T>) => string) | string;

export type HTMLTag = typeof domElements[number];

export type Theme = Record<string, string>;

export type ThemeProvider = () => Theme;

export type CreateElement = <P extends BaseProps>(tag: HTMLTag, props: P, ...o: any) => any;