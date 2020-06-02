/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import Vector2 from 'math/Vector2';
import Matrix2 from 'math/Matrix2';

const { sin: Sine, cos: Cosine } = Math;

export default class Transform2 {
  position: Vector2;
  scale = Vector2.FromPool(1, 1);
  pivot = Vector2.FromPool(0, 0);
  local = new Matrix2();
  global = new Matrix2();
  private _skew = Vector2.FromPool(0, 0);
  private _rotation = 0;
  private _skewCosineX = 1;
  private _skewCosineY = 1;
  private _skewSineX = 0;
  private _skewSineY = 0;

  constructor(x: number, y: number) {
    this.position = Vector2.FromPool(x, y);
  }

  get rotation(): number {
    return this._rotation;
  }

  set rotation(rotation: number) {
    if (this._rotation !== rotation) {
      this._rotation = rotation;
      this.UpdateSkew();
    }
  }

  SetSkew(x: number, y: number): this {
    this._skew.Set(x, y);

    return this.UpdateSkew();
  }

  SetWithMatrix(matrix: Matrix2): this {
    matrix.Decompose(this);

    return this.UpdateSkew();
  }

  UpdateLocal(): this {
    const { local, position, scale, pivot, _skewCosineX, _skewCosineY, _skewSineX, _skewSineY } = this;

    local.a = _skewCosineY * scale.x;
    local.b = _skewSineY * scale.x;
    local.c = _skewSineX * scale.y;
    local.d = _skewCosineX * scale.y;
    local.e = position.x - (pivot.x * local.a + pivot.y * local.c);
    local.f = position.y - (pivot.x * local.b + pivot.y * local.d);

    return this;
  }

  UpdateGlobal(matrix: Matrix2): this {
    const { local, global, position, scale, pivot, _skewCosineX, _skewCosineY, _skewSineX, _skewSineY } = this;

    local.a = _skewCosineY * scale.x;
    local.b = _skewSineY * scale.x;
    local.c = _skewSineX * scale.y;
    local.d = _skewCosineX * scale.y;
    local.e = position.x - (pivot.x * local.a + pivot.y * local.c);
    local.f = position.y - (pivot.x * local.b + pivot.y * local.d);

    global.a = local.a * matrix.a + local.b * matrix.c;
    global.b = local.a * matrix.b + local.b * matrix.d;
    global.c = local.c * matrix.a + local.d * matrix.c;
    global.d = local.c * matrix.b + local.d * matrix.d;
    global.e = local.e * matrix.a + local.f * matrix.c + matrix.e;
    global.f = local.e * matrix.b + local.f * matrix.d + matrix.f;

    return this;
  }

  UpdateSkew(): this {
    const { _skew, _rotation } = this;

    this._skewCosineX = Cosine(_rotation - _skew.x);
    this._skewCosineY = Cosine(_rotation + _skew.y);
    this._skewSineX = -Sine(_rotation - _skew.x);
    this._skewSineY = Sine(_rotation + _skew.y);

    return this;
  }
}
