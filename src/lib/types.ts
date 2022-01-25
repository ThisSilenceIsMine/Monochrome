interface BaseProps {
  className?: string;
  as?: string;
  children?: any;
}

export type Props<T> = T & BaseProps;

export type Interpolation<T> = ((props: Props<T>) => string) | string;
