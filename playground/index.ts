/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import Tests from './tests';

import * as nkf from 'index.front';
console.log(nkf);

const menuContainer = document.createElement('div', { is: 'div' });
const container = document.createElement('div', { is: 'div' });
const emptyKill = (): void => {
  console.log('Empty kill');
};
const tools = {
  onKill: emptyKill,
};

export type PGTools = typeof tools;

console.log(Tests);

function CreateMenuList(record: Record<string, any>): HTMLUListElement {
  const list = document.createElement('ul', { is: 'ul' });

  Object.keys(record).forEach((value) => {
    const item = document.createElement('li', { is: 'li' });
    const text = document.createTextNode(value);

    if (record[value] instanceof Function) {
      const button = document.createElement('button', { is: 'button' });

      button.onclick = (): void => {
        tools.onKill();

        tools.onKill = emptyKill;

        container.innerHTML = '';
        record[value](container, tools);
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
