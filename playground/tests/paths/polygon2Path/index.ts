/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Polygon2Path } from 'paths';

export default function (container: HTMLDivElement): void {
  const canvas = document.createElement('canvas');

  canvas.width = 1000;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  container.appendChild(canvas);

  const path = new Polygon2Path(
    {
      vertices: [
        { x: 0, y: 0 },
        { x: 10, y: 0 },
        { x: 5, y: 10 },
      ],
    },
    { fill: { color: 'red' }, shadow: { color: 'black', blur: 6, offsetX: 5, offsetY: 5, applied: true } }
  );

  path.shape.Scale(3, 3);

  ctx.setTransform(1, 0, 0, 1, 100, 100);

  path.Draw(ctx);

  path.Draw(ctx);

  console.log(path);
}
