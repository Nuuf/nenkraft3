/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export type ShadowStyleParams = {
  color?: string;
  blur?: number;
  offsetX?: number;
  offsetY?: number;
  applied?: boolean;
};

export default class ShadowStyle {
  color: string;
  blur: number;
  offsetX: number;
  offsetY: number;
  applied: boolean;

  constructor({ color = '#C89664', blur = 5, offsetX = 0, offsetY = 0, applied = false }: ShadowStyleParams) {
    this.color = color;
    this.blur = blur;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.applied = applied;
  }

  Apply(ctx: CanvasRenderingContext2D): this {
    if (this.applied === true) {
      ctx.shadowColor = this.color;
      ctx.shadowBlur = this.blur;
      ctx.shadowOffsetX = this.offsetX;
      ctx.shadowOffsetY = this.offsetY;
    }

    return this;
  }
}
