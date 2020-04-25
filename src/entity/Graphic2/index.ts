/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import BatchableContainer2 from 'entity/BatchableContainer2';
import Vector2 from 'math/Vector2';
import ApplyMatrix from 'utility/Functions/ApplyMatrix';

export default class Graphic2 extends BatchableContainer2 {
  anchor = new Vector2(0, 0);
  alpha = 1;

  constructor(x: number, y: number) {
    super(x, y);
  }

  Render(ctx: CanvasRenderingContext2D): this {
    if (this.render === true) {
      this.ProcessTransform(this.parent);
      ApplyMatrix(ctx, this.transform.global);
    }

    return this;
  }
}
