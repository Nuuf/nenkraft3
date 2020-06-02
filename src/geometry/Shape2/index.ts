/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Point2 } from 'math/Vector2';

export interface Shape2 {
  width: number;
  height: number;
  belongsTo?: any;
  IntersectsPoint2(p: Point2): boolean;
  Copy(): Shape2;
  SetWith(object: any): this;
  Scale(x: number, y: number): this;
}
