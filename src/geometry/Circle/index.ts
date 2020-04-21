/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import Vector2, { Point2 } from 'math/Vector2';

const { PI } = Math;

export interface BasicCircle {
  center: Point2;
  radius: number;
}

export interface BasicEllipse {
  center: Point2;
  radiusX: number;
  radiusY: number;
}

export default class Circle implements BasicCircle {
  center: Vector2;
  private _radius = 0;
  private _radiusSquared = 0;
  private _diameter = 0;
  private _area = 0;
  belongsTo: any;

  constructor({ center: { x, y }, radius }: BasicCircle) {
    this.center = Vector2.FromPool(x, y);
    this.radius = radius;
  }

  get radius(): number {
    return this._radius;
  }

  set radius(radius: number) {
    this._radius = radius;
    this._radiusSquared = radius * radius;
    this._diameter = radius * 2;
    this._area = PI * radius * radius;
  }

  get radiusSquared(): number {
    return this._radiusSquared;
  }

  get diameter(): number {
    return this._diameter;
  }

  get width(): number {
    return this._diameter;
  }

  get height(): number {
    return this._diameter;
  }

  get area(): number {
    return this._area;
  }

  get position(): Vector2 {
    return this.center;
  }

  get x(): number {
    return this.center.x;
  }

  get y(): number {
    return this.center.y;
  }

  Copy(): Circle {
    return new Circle(this);
  }

  Set(x: number, y: number, radius: number): Circle {
    this.center.Set(x, y);
    this.radius = radius;
    return this;
  }

  Scale(scale: number): Circle {
    this.radius *= scale;
    return this;
  }

  IntersectsPoint2(p: Point2): boolean {
    return this.radiusSquared >= Vector2.GetDistanceSquaredBetween(this.center, p);
  }

  IntersectsCircle(circle: Circle): boolean {
    const radii = this.radius + circle.radius;
    return radii * radii >= Vector2.GetDistanceSquaredBetween(this.center, circle.center);
  }

  ContainsCircle(circle: Circle): boolean {
    return this.radius - circle.radius > Vector2.GetDistanceBetween(this.center, circle.center);
  }
}
