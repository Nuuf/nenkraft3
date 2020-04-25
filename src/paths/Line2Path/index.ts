/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import Line2, { BasicLine2 } from 'geometry/Line2';
import { StrokeShadowStyles, SSa, StrokeShadowStylesParams } from 'style/factoryFunctions';

export default class CirclePath {
  shape: Line2;
  style: StrokeShadowStyles;

  constructor(line2: BasicLine2, style: StrokeShadowStylesParams) {
    this.shape = new Line2(line2);
    this.style = SSa(style);
  }

  Draw(ctx: CanvasRenderingContext2D): this {
    const { start, end } = this.shape;
    const { stroke, shadow } = this.style;

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.closePath();

    if (shadow.applied === true) shadow.Apply(ctx);
    if (stroke.applied === true) stroke.Apply(ctx) && ctx.stroke();

    return this;
  }
}
