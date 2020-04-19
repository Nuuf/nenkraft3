/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface BasicRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default class Rectangle implements BasicRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  belongsTo: any;
  constructor({ x, y, width, height }: Rectangle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
