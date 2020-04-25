/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { AABB2 } from 'geometry';

export default function (container: HTMLDivElement): void {
  container.appendChild(document.createElement('canvas'));
  const aabb2 = new AABB2({ topLeftX: 0, topLeftY: 0, bottomRightX: 100, bottomRightY: 100 });

  console.log(aabb2);
}
