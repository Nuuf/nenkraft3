/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Line2Path } from 'paths';

export default function (container: HTMLDivElement): void {
  const canvas = document.createElement('canvas');

  canvas.width = 1000;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  container.appendChild(canvas);

  const path = new Line2Path({ start: { x: 0, y: 0 }, end: { x: 100, y: 100 } }, {});

  path.Draw(ctx);

  console.log(path);
}
