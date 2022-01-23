export const appendStyles = (className: string, styles: string) => {
  let styleTag = document.querySelector('#mystyled');
  const compiled = `.${className} {${styles}}`;

  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.setAttribute('id', 'mystyled');
  }

  if (styleTag.innerHTML.indexOf(className) !== -1) return;

  styleTag.appendChild(document.createTextNode(compiled));

  document.head.appendChild(styleTag);
};
