/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import AABB2, { BasicAABB2 } from 'geometry/AABB2';
import { FillStrokeShadowStyles, FSSa, FillStrokeShadowStylesParams } from 'style/factoryFunctions';

export default class AABB2Path {
  shape: AABB2;
  style: FillStrokeShadowStyles;

  constructor(aabb: BasicAABB2, style: FillStrokeShadowStylesParams) {
    this.shape = new AABB2(aabb);
    this.style = FSSa(style);
  }

  Draw(ctx: CanvasRenderingContext2D): this {
    const { topLeftX, topLeftY, bottomRightX, bottomRightY } = this.shape;
    const { fill, stroke, shadow } = this.style;

    ctx.beginPath();
    ctx.moveTo(topLeftX, topLeftY);
    ctx.lineTo(bottomRightX, topLeftY);
    ctx.lineTo(bottomRightX, bottomRightY);
    ctx.lineTo(topLeftX, bottomRightY);
    ctx.closePath();

    if (shadow.applied === true) shadow.Apply(ctx);
    if (fill.applied === true) fill.Apply(ctx) && ctx.fill();
    if (stroke.applied === true) stroke.Apply(ctx) && ctx.stroke();

    return this;
  }
}
