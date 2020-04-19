/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import Draw from 'draw';

export default function (container: HTMLDivElement): void {
  const canvas = document.createElement('canvas');
  canvas.width = 1000;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const draw = new Draw();
  container.appendChild(canvas);
  draw
    .Rectangle({
      rc: ctx,
      x: 25,
      y: 25,
      width: 100,
      height: 100,
      identity: true,
      fill: true,
      stroke: true,
    })
    .Circle({
      rc: ctx,
      center: { x: 50, y: 50 },
      radius: 50,
      fill: true,
    });
  console.log(draw);
}
