/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Graphic2 } from 'entity';
import { RectanglePath, CirclePath, Line2Path, Polygon2Path, AABB2Path } from 'paths';

export default function (container: HTMLDivElement): void {
  const canvas = document.createElement('canvas');

  canvas.width = 1000;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  container.appendChild(canvas);

  const g21 = new Graphic2(
    0,
    100,
    new AABB2Path({ topLeftX: 0, topLeftY: 0, bottomRightX: 100, bottomRightY: 100 }, { fill: { color: 'green' } })
  );
  const g22 = new Graphic2(
    100,
    100,
    new CirclePath({ center: { x: 50, y: 50 }, radius: 50 }, { stroke: { color: 'green', lineWidth: 5 } })
  );
  const g23 = new Graphic2(
    200,
    100,
    new Line2Path({ start: { x: 0, y: 0 }, end: { x: 100, y: 100 } }, { stroke: { color: 'black' } })
  );
  const g24 = new Graphic2(
    300,
    100,
    new Polygon2Path(
      {
        vertices: [
          { x: 0, y: 0 },
          { x: 100, y: 0 },
          { x: 50, y: 100 },
        ],
      },
      {}
    )
  );
  const g25 = new Graphic2(
    400,
    100,
    new RectanglePath({ x: 0, y: 0, width: 100, height: 50 }, { fill: { color: 'red' } })
  );

  g21.Render(ctx);
  g22.Render(ctx);
  g23.Render(ctx);
  g24.Render(ctx);
  g25.Render(ctx);
}
