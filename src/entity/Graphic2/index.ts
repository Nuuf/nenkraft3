/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import BatchableContainer2 from 'entity/BatchableContainer2';
import ApplyMatrix from 'utility/functions/ApplyMatrix';
import { Path2 } from 'paths/Path2';
import { Shape2 } from 'geometry/Shape2';
import Vector2, { Point2 } from 'math/Vector2';

export default class Graphic2<T extends Shape2, C> extends BatchableContainer2 {
  alpha = 1;
  path: Path2<T, C>;

  private static PS_TP = Vector2.FromPool(0, 0);

  constructor(x: number, y: number, path: Path2<T, C>) {
    super(x, y);
    this.path = path;
    this.SetSourceSize(path.shape.width, path.shape.height);
  }

  Render(ctx: CanvasRenderingContext2D): this {
    if (this.render === true) {
      this.ProcessTransform(this.parent);

      if (this.display === true) {
        ApplyMatrix(ctx, this.transform.global);
        const { path, alpha } = this;

        ctx.globalAlpha = alpha;
        path.Draw(ctx);
      }

      this.RenderChildren(ctx);
    }

    return this;
  }

  IntersectsPoint2(p: Point2): boolean {
    if (this.interactive === false) return false;
    const PS_TP = Graphic2.PS_TP;

    PS_TP.SetV(p).SubtractV(this.position);

    return this.path.shape.IntersectsPoint2(p);
  }
}
