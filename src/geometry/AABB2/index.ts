/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import Vector2, { Point2 } from 'math/Vector2';
import { BasicRectangle } from 'geometry/Rectangle';

export interface BasicAABB2 {
  topLeftX: number;
  topLeftY: number;
  bottomRightX: number;
  bottomRightY: number;
}

export default class AABB2 {
  private _topLeft: Vector2;
  private _bottomRight: Vector2;
  private _width = 0;
  private _height = 0;
  private _halfWidth = 0;
  private _halfHeight = 0;
  private _area = 0;
  belongsTo: any;

  constructor({ topLeftX, topLeftY, bottomRightX, bottomRightY }: BasicAABB2) {
    this._topLeft = Vector2.FromPool(topLeftX, topLeftY);
    this._bottomRight = Vector2.FromPool(bottomRightX, bottomRightY);
    this.Compute();
  }

  get topLeftX(): number {
    return this._topLeft.x;
  }

  get topLeftY(): number {
    return this._topLeft.y;
  }

  get bottomRightX(): number {
    return this._bottomRight.x;
  }

  get bottomRightY(): number {
    return this._bottomRight.y;
  }

  get area(): number {
    return this._area;
  }

  private Compute(): void {
    this._width = this.bottomRightX - this.topLeftX;
    this._height = this.bottomRightY - this.topLeftY;
    this._halfWidth = this._width * 0.5;
    this._halfHeight = this._height * 0.5;
    this._area = this._width * this._height;
  }

  Set(topLeftX: number, topLeftY: number, bottomRightX: number, bottomRightY: number): AABB2 {
    this._topLeft.Set(topLeftX, topLeftY);
    this._bottomRight.Set(bottomRightX, bottomRightY);
    this.Compute();
    return this;
  }

  SetWith({ topLeftX, topLeftY, bottomRightX, bottomRightY }: BasicAABB2): AABB2 {
    return this.Set(topLeftX, topLeftY, bottomRightX, bottomRightY);
  }

  SetAsRectangle({ x, y, width, height }: BasicRectangle): AABB2 {
    return this.Set(x, y, x + width, y + height);
  }

  SetPosition(x: number, y: number): AABB2 {
    this._topLeft.Set(x, y);
    this._bottomRight.Set(x + this._width, y + this._height);
    return this;
  }

  IntersectsPoint2(p: Point2): boolean {
    return !(p.x < this._topLeft.x || p.x > this._bottomRight.x || p.y < this._topLeft.y || p.y > this._bottomRight.y);
  }

  ContainsPoint2(p: Point2): boolean {
    return !(
      p.x <= this._topLeft.x ||
      p.x >= this._bottomRight.x ||
      p.y <= this._topLeft.y ||
      p.y >= this._bottomRight.y
    );
  }

  IntersectsAABB2(aabb2: BasicAABB2): boolean {
    return !(
      aabb2.topLeftX >= this._bottomRight.x ||
      aabb2.topLeftY >= this._bottomRight.y ||
      aabb2.bottomRightX <= this._topLeft.x ||
      aabb2.bottomRightY <= this._topLeft.y
    );
  }

  ContainsAABB2(aabb2: AABB2): boolean {
    if (aabb2.area > this.area) return false;
    return (
      aabb2.topLeftX > this._topLeft.x &&
      aabb2.topLeftY > this._topLeft.y &&
      aabb2.bottomRightX < this._bottomRight.x &&
      aabb2.bottomRightY < this._bottomRight.y
    );
  }
}
