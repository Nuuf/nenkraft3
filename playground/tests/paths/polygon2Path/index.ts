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
        { x: 100, y: 0 },
        { x: 50, y: 100 },
      ],
    },
    { fill: { color: 'red' }, shadow: { color: 'black', blur: 6, offsetX: 5, offsetY: 5, applied: true } }
  );

  path.Draw(ctx);

  console.log(path);
}
