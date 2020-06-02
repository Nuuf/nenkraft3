/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { DrawableContainer2, Graphic2 } from 'entity';
import { RectanglePath } from 'paths';
import { RandomInteger } from 'utility/functions';
import Draw2 from 'draw2';
import { AABB2 } from 'geometry';

export default function (container: HTMLDivElement): void {
  const canvas = document.createElement('canvas');

  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  container.appendChild(canvas);

  const draw = new Draw2();
  const box = new DrawableContainer2(256, 256);
  const path = new RectanglePath(
    {
      x: 0,
      y: 0,
      width: 16,
      height: 16,
    },
    {}
  );

  for (var i = 0; i < 10; ++i) {
    box.AddChild(new Graphic2(RandomInteger(-240, 240), RandomInteger(-240, 240), path));
  }

  box.ClusterBind();

  box.Render(ctx);

  const bounds = box.bounds.local as AABB2;

  console.log(bounds);

  draw.AABB({
    transform: box.transform.global,
    topLeftX: bounds.topLeftX,
    topLeftY: bounds.topLeftY,
    bottomRightX: bounds.bottomRightX,
    bottomRightY: bounds.bottomRightY,
    fill: true,
    rc: ctx,
  });
}
