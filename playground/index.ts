/* eslint-disable @typescript-eslint/no-explicit-any */
import Tests from './tests/index';

const menuContainer = document.createElement('div', { is: 'div' });
const container = document.createElement('div', { is: 'div' });

console.log(Tests);

function CreateMenuList(record: Record<string, any>): HTMLUListElement {
  const list = document.createElement('ul', { is: 'ul' });
  Object.keys(record).forEach((value) => {
    const item = document.createElement('li', { is: 'li' });
    const text = document.createTextNode(value);
    if (record[value] instanceof Function) {
      const button = document.createElement('button', { is: 'button' });
      button.onclick = (): void => {
        container.innerHTML = '';
        record[value](container);
      };
      item.appendChild(button);
      button.appendChild(text);
    } else {
      item.appendChild(text);
    }
    list.appendChild(item);
    const rec = CreateMenuList(record[value]);
    if (rec.childNodes.length !== 0) {
      item.appendChild(rec);
    }
  });
  return list;
}

menuContainer.appendChild(CreateMenuList(Tests));

document.body.appendChild(menuContainer);
document.body.appendChild(container);
