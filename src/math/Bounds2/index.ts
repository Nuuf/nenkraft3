/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { AABB2 } from 'geometry';
import { Point2 } from 'math/Vector2';

export default class Bounds2 {
  local: AABB2 | null = null;
  global: AABB2 | null = null;
  localDirty = true;
  globalDirty = true;

  ComputeLocal(x: number, y: number, width: number, height: number, anchor?: Point2, owner?: any): AABB2 {
    if (anchor) {
      x -= width * anchor.x;
      y -= height * anchor.y;
    }
    if (this.local === null) {
      this.local = new AABB2({
        topLeftX: x,
        topLeftY: y,
        bottomRightX: x + width,
        bottomRightY: y + height,
      });
      this.local.belongsTo = owner;
    } else {
      this.local.Set(x, y, x + width, y + height);
    }
    this.localDirty = false;
    return this.local;
  }

  ComputeGlobal(x: number, y: number, width: number, height: number, anchor?: Point2, owner?: any): AABB2 {
    if (anchor) {
      x -= width * anchor.x;
      y -= height * anchor.y;
    }
    if (this.global === null) {
      this.global = new AABB2({
        topLeftX: x,
        topLeftY: y,
        bottomRightX: x + width,
        bottomRightY: y + height,
      });
      this.global.belongsTo = owner;
    } else {
      this.global.Set(x, y, x + width, y + height);
    }
    this.globalDirty = false;
    return this.global;
  }
}
