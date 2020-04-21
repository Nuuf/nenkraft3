/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import Vector2, { Point2 } from 'math/Vector2';

export interface BasicLine2 {
  start: Point2;
  end: Point2;
}

export default class Line2 implements BasicLine2 {
  start: Vector2;
  end: Vector2;
  belongsTo: any;
  constructor({ start: { x: sx, y: sy }, end: { x: ex, y: ey } }: BasicLine2) {
    this.start = Vector2.FromPool(sx, sy);
    this.end = Vector2.FromPool(ex, ey);
  }
}
