/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import Circle, { BasicCircle } from 'geometry/Circle';
import { FillStrokeShadowStyles, FSSa, FillStrokeShadowStylesParams } from 'style/factoryFunctions';
import { PII } from 'math/constants';

export default class CirclePath {
  shape: Circle;
  style: FillStrokeShadowStyles;

  constructor(circle: BasicCircle, style: FillStrokeShadowStylesParams) {
    this.shape = new Circle(circle);
    this.style = FSSa(style);
  }

  Draw(ctx: CanvasRenderingContext2D): this {
    const {
      center: { x, y },
      radius,
    } = this.shape;
    const { fill, stroke, shadow } = this.style;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, PII);
    ctx.closePath();

    shadow.Apply(ctx);
    fill.Apply(ctx);
    stroke.Apply(ctx);

    return this;
  }
}
