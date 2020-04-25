/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export type FillStyleParams = {
  color?: string;
  applied?: boolean;
};

export default class FillStyle {
  color: string;
  applied: boolean;

  constructor({ color = '#6496C8', applied = true }: FillStyleParams) {
    this.color = color;
    this.applied = applied;
  }

  Apply(ctx: CanvasRenderingContext2D): this {
    if (this.applied === true) {
      ctx.fillStyle = this.color;
    }

    return this;
  }
}
