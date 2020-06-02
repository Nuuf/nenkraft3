/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Shape2 } from 'geometry/Shape2';

export interface Path2<T extends Shape2, C> {
  shape: T;
  style: C;
  Draw(ctx: CanvasRenderingContext2D): this;
}
