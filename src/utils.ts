export const createElement = (template): Element => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element.firstElementChild;
}

export const getNextElement = (cursorPosition: number, currentElement: Element): Element => {
  // Получаем объект с размерами и координатами
  const currentElementCoord = currentElement.getBoundingClientRect();
  // Находим вертикальную координату центра текущего элемента
  const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

  // Если курсор выше центра элемента, возвращаем текущий элемент
  // В ином случае — следующий DOM-элемент
  const nextElement = (cursorPosition < currentElementCenter) ?
      currentElement :
      currentElement.nextElementSibling;

  return nextElement;
};
