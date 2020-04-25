/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Container2 } from 'entity';

export default function (container: HTMLDivElement): void {
  container.appendChild(document.createElement('canvas'));
  const parent = new Container2(0, 0);
  const child = new Container2(0, 0);

  parent.AddChild(child);

  console.log(parent);
}
