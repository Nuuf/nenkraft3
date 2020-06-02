/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import Vector2, { Point2 } from 'math/Vector2';
import Bounds2 from 'math/Bounds2';
import Transform2 from 'math/Transform2';
import Matrix2 from 'math/Matrix2';
import AABB2 from 'geometry/AABB2';
import Container2 from 'entity/Container2';

const { abs: Abs, sin: Sine, cos: Cosine } = Math;

export default class Core2 {
  transform: Transform2;
  bounds: Bounds2 = new Bounds2();
  data?: any;
  transformAutomaticUpdate = true;
  render = true;
  anchor: Vector2 = Vector2.FromPool(0, 0);
  private _transformShouldUpdate = true;
  protected _width = 0;
  protected _height = 0;

  private static PS_NULL_TRANSFORM = new Transform2(0, 0);
  private static PS_T = new Transform2(0, 0);
  private static PS_M = new Matrix2();

  constructor(x: number, y: number) {
    this.transform = new Transform2(x, y);
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

  get globalX(): number {
    return this.transform.global.e;
  }

  get globalY(): number {
    return this.transform.global.f;
  }

  Render(parent?: Container2): this {
    if (this.render) return this.ProcessTransform(parent);

    return this;
  }

  UpdateTransform(parent?: Container2): this {
    if (parent != null) this.transform.UpdateGlobal(parent.transform.global);
    else this.transform.UpdateGlobal(Core2.PS_NULL_TRANSFORM.global);

    return this;
  }

  ProcessTransform(parent?: Container2): this {
    if (this._transformShouldUpdate === true) {
      this.UpdateTransform(parent);
      if (this.transformAutomaticUpdate === false) this._transformShouldUpdate = false;
    }

    return this;
  }

  RequestTransformUpdate(): this {
    this._transformShouldUpdate = true;

    return this;
  }

  GlobalToLocal(v: Vector2, conversion?: Matrix2): Vector2 {
    const { PS_M, PS_T } = Core2;

    if (conversion) {
      PS_M.SetMultiple(this.transform.global, conversion);
      PS_M.Decompose(PS_T);
    } else {
      this.transform.global.Decompose(PS_T);
    }

    v.SubtractV(PS_T.position).DivideV(PS_T.scale).Rotate(-PS_T.rotation);

    return v;
  }

  ComputeLocalBounds(anchor: Point2): AABB2 {
    return this.bounds.ComputeLocal(this.x, this.y, Abs(this.width), Abs(this.height), anchor, this);
  }

  ComputeGlobalBounds(anchor: Point2, conversion?: Matrix2): AABB2 {
    const { PS_M, PS_T } = Core2;

    if (conversion) {
      PS_M.SetMultiple(this.transform.global, conversion);
      PS_M.Decompose(PS_T);
    } else {
      this.transform.global.Decompose(PS_T);
    }

    const { rotation, position, scale } = PS_T;
    const sineRotation = Sine(rotation);
    const cosineRotation = Cosine(rotation);
    const width = this._width * scale.x;
    const height = this._height * scale.y;

    return this.bounds.ComputeGlobal(
      position.x,
      position.y,
      Abs(width * cosineRotation) + Abs(height * sineRotation),
      Abs(width * sineRotation) + Abs(height * cosineRotation),
      anchor,
      this
    );
  }

  SetSourceSize(width: number, height: number): this {
    this._width = width;
    this._height = height;

    return this;
  }
}
