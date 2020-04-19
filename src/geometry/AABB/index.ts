/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import Vector2 from 'math/Vector2';

export default class AABB {
  topLeft: Vector2;
  bottomRight: Vector2;
  private _width = 0;
  private _height = 0;
  private _halfWidth = 0;
  private _halfHeight = 0;
  private _area = 0;
  belongsTo: any;
  constructor({ topLeft: { x: ax, y: ay }, bottomRight: { x: bx, y: by } }: AABB) {
    this.topLeft = Vector2.FromPool(ax, ay);
    this.bottomRight = Vector2.FromPool(bx, by);
  }
}
