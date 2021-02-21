export function createElement(template): Element {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element.firstElementChild;
}
