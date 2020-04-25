/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Circle } from 'geometry';

export default function (container: HTMLDivElement): void {
  container.appendChild(document.createElement('canvas'));
  const circle = new Circle({ center: { x: 0, y: 0 }, radius: 50 });

  console.log(circle);
}
