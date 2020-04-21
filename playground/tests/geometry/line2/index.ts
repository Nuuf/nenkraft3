/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import Line2 from 'geometry/Line2';

export default function (container: HTMLDivElement): void {
  container.appendChild(document.createElement('canvas'));
  const line2 = new Line2({ start: { x: 0, y: 0 }, end: { x: 100, y: 100 } });
  console.log(line2);
}
