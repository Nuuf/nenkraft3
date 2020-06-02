/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import Vector2, { Point2 } from 'math/Vector2';
import { Shape2 } from 'geometry/Shape2';

const { abs: Abs } = Math;

export interface BasicLine2 {
  start: Point2;
  end: Point2;
}

export default class Line2 implements BasicLine2, Shape2 {
  start: Vector2;
  end: Vector2;
  epsilon = 1000;
  belongsTo: any;

  static get EMPTY(): BasicLine2 {
    return { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } };
  }

  constructor({ start: { x: sx, y: sy }, end: { x: ex, y: ey } }: BasicLine2) {
    this.start = Vector2.FromPool(sx, sy);
    this.end = Vector2.FromPool(ex, ey);
  }

  get width(): number {
    return Abs(this.end.x - this.start.x);
  }

  get height(): number {
    return Abs(this.end.y - this.start.y);
  }

  get length(): number {
    return Vector2.GetDistanceBetween(this.start, this.end);
  }

  get lengthSquared(): number {
    return Vector2.GetDistanceSquaredBetween(this.start, this.end);
  }

  Copy(): Line2 {
    return new Line2(this);
  }

  Set(sx: number, sy: number, ex: number, ey: number): this {
    this.start.Set(sx, sy);
    this.end.Set(ex, ey);

    return this;
  }

  SetWith({ start: { x: sx, y: sy }, end: { x: ex, y: ey } }: BasicLine2): this {
    return this.Set(sx, sy, ex, ey);
  }

  Scale(x: number, y: number): this {
    this.end.Multiply(x, y);

    return this;
  }

  IntersectsPoint2(p: Point2): boolean {
    const { start, end } = this;
    const cross = (p.y - start.y) * (end.x - start.x) - (p.x - start.x) * (end.y - start.y);

    if (Math.abs(cross) > this.epsilon) {
      return false;
    }

    const dot = (p.x - start.x) * (end.x - start.x) + (p.y - start.y) * (end.y - start.y);

    if (dot < 0) {
      return false;
    }

    if (dot > this.lengthSquared) {
      return false;
    }

    return true;
  }
}
