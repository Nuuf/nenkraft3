/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Matrix2 } from 'math';

export default function (container: HTMLDivElement): void {
  container.appendChild(document.createElement('canvas'));
  const matrix = new Matrix2();

  console.log(matrix);
}
