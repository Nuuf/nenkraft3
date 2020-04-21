/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Transform2, Vector2 } from 'math';
import Bounds2 from 'math/Bounds2';

export default class Core2 {
  transform: Transform2;
  bounds: Bounds2;
  data?: any;
  private _width = 0;
  private _height = 0;

  constructor(x: number, y: number) {
    this.transform = new Transform2(x, y);
    this.bounds = new Bounds2();
  }

  get position(): Vector2 {
    return this.transform.position;
  }

  get scale(): Vector2 {
    return this.transform.scale;
  }

  get rotation(): number {
    return this.transform.rotation;
  }

  set rotation(rotation: number) {
    this.transform.rotation = rotation;
  }

  get pivot(): Vector2 {
    return this.transform.pivot;
  }

  get x(): number {
    return this.transform.position.x;
  }

  set x(x: number) {
    this.transform.position.x = x;
  }

  get y(): number {
    return this.transform.position.y;
  }

  set y(y: number) {
    this.transform.position.y = y;
  }

  get width(): number {
    return this.transform.scale.x * this._width;
  }

  set width(width: number) {
    this.transform.scale.x = width / this._width;
  }

  get height(): number {
    return this.transform.scale.y * this._height;
  }

  set height(height: number) {
    this.transform.scale.y = height / this._height;
  }
}
