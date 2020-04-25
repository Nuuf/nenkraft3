/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { CirclePath } from 'paths';

export default function (container: HTMLDivElement): void {
  const canvas = document.createElement('canvas');

  canvas.width = 1000;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  container.appendChild(canvas);

  const path = new CirclePath({ center: { x: 50, y: 50 }, radius: 50 }, {});

  path.Draw(ctx);

  console.log(path);
}
