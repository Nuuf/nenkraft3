/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { AABB2Path } from 'paths';

export default function (container: HTMLDivElement): void {
  const canvas = document.createElement('canvas');

  canvas.width = 1000;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  container.appendChild(canvas);

  const path = new AABB2Path({ topLeftX: 0, topLeftY: 0, bottomRightX: 100, bottomRightY: 100 }, {});

  path.Draw(ctx);

  console.log(path);
}
