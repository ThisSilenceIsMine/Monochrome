import { css } from './css';

let h: Function;

export const setup = (factory: Function) => {
  if (h) return;
  h = factory;
};

interface BaseProps {
  as?: string;
  className?: string;
}

export const styled = <Props extends BaseProps>(
  tag: keyof HTMLElementTagNameMap
) =>
  function (style: TemplateStringsArray) {
    function Styled(props: Props) {
      let _props = { ...props };
      let _as = _props.as ?? tag;
      const styleSheet = style.reduce((prev, curr) => prev + curr);

      const className = css(styleSheet);
      _props.className = className;

      return h(_as, _props);
    }

    return Styled;
  };

const el = document.createElement('div');
