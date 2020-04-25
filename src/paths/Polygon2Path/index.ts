/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import Polygon2, { BasicPolygon2 } from 'geometry/Polygon2';
import { FillStrokeShadowStyles, FSSa, FillStrokeShadowStylesParams } from 'style/factoryFunctions';

export default class Polygon2Path {
  shape: Polygon2;
  style: FillStrokeShadowStyles;

  constructor(polygon: BasicPolygon2, style: FillStrokeShadowStylesParams) {
    this.shape = new Polygon2(polygon);
    this.style = FSSa(style);
  }

  Draw(ctx: CanvasRenderingContext2D): this {
    const { vertices } = this.shape;
    const { fill, stroke, shadow } = this.style;

    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);

    for (var i = 1; i < vertices.length; ++i) {
      ctx.lineTo(vertices[i].x, vertices[i].y);
    }

    ctx.closePath();

    if (shadow.applied === true) shadow.Apply(ctx);
    if (fill.applied === true) fill.Apply(ctx) && ctx.fill();
    if (stroke.applied === true) stroke.Apply(ctx) && ctx.stroke();

    return this;
  }
}
