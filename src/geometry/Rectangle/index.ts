/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export interface BasicRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface BasicRoundRectangle extends BasicRectangle {
  radius: number;
}

export default class Rectangle implements BasicRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  belongsTo: any;
  constructor({ x, y, width, height }: BasicRectangle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
