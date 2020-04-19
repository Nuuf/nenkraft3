/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import Vector2 from 'math/Vector2';

export default function (container: HTMLDivElement): void {
  container.appendChild(document.createElement('canvas'));
  const vector = new Vector2(0, 0);
  console.log(vector);
}
