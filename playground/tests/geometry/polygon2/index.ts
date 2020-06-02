/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Polygon2 } from 'geometry';

export default function (container: HTMLDivElement): void {
  container.appendChild(document.createElement('canvas'));
  const polygon2 = new Polygon2({
    vertices: [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 50, y: 100 },
    ],
  });

  console.log(polygon2);
}
