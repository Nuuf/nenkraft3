/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import Draw2 from 'draw2';

export default function (container: HTMLDivElement): void {
  const canvas = document.createElement('canvas');

  canvas.width = 1000;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const draw = new Draw2();

  container.appendChild(canvas);
  draw
    .Rectangle({
      rc: ctx,
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      identity: true,
      fill: true,
      stroke: true,
      fillStyle: 'red',
    })
    .RoundRectangle({
      rc: ctx,
      x: 100,
      y: 0,
      width: 100,
      height: 100,
      radius: 25,
      fill: true,
      stroke: true,
      fillStyle: 'blue',
    })
    .AABB({
      rc: ctx,
      topLeftX: 200,
      topLeftY: 0,
      bottomRightX: 300,
      bottomRightY: 100,
      fill: true,
      stroke: true,
      fillStyle: 'purple',
    })
    .Circle({
      rc: ctx,
      center: { x: 350, y: 50 },
      radius: 50,
      fill: true,
      stroke: true,
      fillStyle: 'green',
    })
    .Ellipse({
      rc: ctx,
      center: { x: 450, y: 50 },
      radiusX: 50,
      radiusY: 40,
      fill: true,
      stroke: true,
      fillStyle: 'pink',
    })
    .Line({
      rc: ctx,
      start: { x: 500, y: 0 },
      end: { x: 600, y: 100 },
      stroke: true,
    })
    .LineChain({
      rc: ctx,
      points: [
        { x: 0, y: 100 },
        { x: 100, y: 100 },
        { x: 50, y: 200 },
      ],
      fill: true,
      stroke: true,
      close: true,
      fillStyle: 'black',
    })
    .Arc({
      rc: ctx,
      center: { x: 150, y: 150 },
      radius: 50,
      startAngle: 0,
      endAngle: 4.5,
      fill: true,
      stroke: false,
      anticlosewise: true,
      fillStyle: 'yellow',
    })
    .EllipticArc({
      rc: ctx,
      center: { x: 250, y: 150 },
      radiusX: 50,
      radiusY: 40,
      startAngle: 0,
      endAngle: 2.56,
      fill: true,
      stroke: false,
      anticlosewise: false,
      fillStyle: 'orange',
    })
    .Curve({
      rc: ctx,
      start: { x: 300, y: 150 },
      control1: { x: 400, y: 100 },
      control2: { x: 400, y: 200 },
      radius: 45,
      fill: true,
      stroke: false,
      fillStyle: 'magenta',
    })
    .BezierCurve({
      rc: ctx,
      start: { x: 400, y: 150 },
      control1: { x: 450, y: 100 },
      control2: { x: 450, y: 200 },
      end: { x: 500, y: 150 },
      fill: true,
      stroke: false,
      fillStyle: 'grey',
    })
    .QuadraticCurve({
      rc: ctx,
      start: { x: 500, y: 150 },
      control1: { x: 550, y: 100 },
      end: { x: 600, y: 150 },
      fill: true,
      stroke: false,
      fillStyle: 'turquoise',
    });
  console.log(draw);
}
