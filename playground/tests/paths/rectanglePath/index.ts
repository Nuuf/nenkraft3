/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { RectanglePath } from 'paths';

export default function (container: HTMLDivElement): void {
  const canvas = document.createElement('canvas');

  canvas.width = 1000;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  container.appendChild(canvas);

  const path = new RectanglePath({ x: 0, y: 0, width: 100, height: 100 }, {});

  path.Draw(ctx);

  console.log(path);
}
