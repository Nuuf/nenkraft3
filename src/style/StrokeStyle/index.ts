/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export type StrokeStyleParams = {
  color?: string;
  lineCap?: CanvasLineCap;
  lineJoin?: CanvasLineJoin;
  lineWidth?: number;
  lineDashOffset?: number;
  lineDash?: Array<number>;
  miterLimit?: number;
  applied?: boolean;
};

export default class StrokeStyle {
  color: string;
  lineCap: CanvasLineCap;
  lineJoin: CanvasLineJoin;
  lineWidth: number;
  lineDashOffset: number;
  lineDash: Array<number>;
  miterLimit: number;
  applied: boolean;

  constructor({
    color = '#C89664',
    lineCap = 'round',
    lineJoin = 'round',
    lineWidth = 2,
    lineDashOffset = 0,
    lineDash = [0, 0],
    miterLimit = 10,
    applied = true,
  }: StrokeStyleParams) {
    this.color = color;
    this.lineCap = lineCap;
    this.lineJoin = lineJoin;
    this.lineWidth = lineWidth;
    this.lineDashOffset = lineDashOffset;
    this.lineDash = lineDash;
    this.miterLimit = miterLimit;
    this.applied = applied;
  }

  Apply(ctx: CanvasRenderingContext2D): this {
    if (this.applied === true) {
      ctx.strokeStyle = this.color;
      ctx.lineCap = this.lineCap;
      ctx.lineJoin = this.lineJoin;
      ctx.lineWidth = this.lineWidth;
      ctx.miterLimit = this.miterLimit;
      ctx.lineDashOffset = this.lineDashOffset;
      ctx.setLineDash(this.lineDash);
      ctx.stroke();
    }

    return this;
  }
}
