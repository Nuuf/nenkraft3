/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Point2 } from 'math/Vector2';
import { Shape2 } from 'geometry/Shape2';

export interface BasicRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface BasicRoundRectangle extends BasicRectangle {
  radius: number;
}

export default class Rectangle implements BasicRectangle, Shape2 {
  x: number;
  y: number;
  width: number;
  height: number;
  belongsTo: any;

  static get EMPTY(): BasicRectangle {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  constructor({ x, y, width, height }: BasicRectangle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  Copy(): Rectangle {
    return new Rectangle(this);
  }

  Set(x: number, y: number, width: number, height: number): this {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    return this;
  }

  SetWith({ x, y, width, height }: BasicRectangle): this {
    return this.Set(x, y, width, height);
  }

  Scale(x: number, y: number): this {
    this.width *= x;
    this.height *= y;

    return this;
  }

  IntersectsPoint2(p: Point2): boolean {
    const blx = this.x + this.width;
    const bly = this.y + this.height;

    return !(p.x < this.x || p.x > blx || p.y < this.y || p.y > bly);
  }
}
