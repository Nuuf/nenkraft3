/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Rectangle } from 'geometry';

export default function (container: HTMLDivElement): void {
  container.appendChild(document.createElement('canvas'));
  const rectangle = new Rectangle({ x: 0, y: 0, width: 100, height: 100 });

  console.log(rectangle);
}
