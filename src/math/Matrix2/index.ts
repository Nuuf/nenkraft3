/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import Transform2 from 'math/Transform2';

const { abs: Abs, sqrt: Sqrt, sin: Sine, cos: Cosine, atan2: Atan2, PI } = Math;

export default class Matrix2 {
  array = new Float32Array(9);
  a = 1;
  b = 0;
  c = 0;
  d = 1;
  e = 0;
  f = 0;

  private static PS_EPSILON = 0.01;

  static Multiply(a: Matrix2, b: Matrix2): Matrix2 {
    return new Matrix2().Set(
      a.a * b.a + a.b * b.c,
      a.a * b.a + a.b * b.d,
      a.c * b.a + a.d * b.c,
      a.c * b.b + a.d * b.d,
      a.e * b.a + a.f * b.c + b.e,
      a.e * b.b + a.f * b.d + b.f
    );
  }

  Copy(): Matrix2 {
    return new Matrix2().Set(this.a, this.b, this.c, this.d, this.e, this.f);
  }

  Set(a: number, b: number, c: number, d: number, e: number, f: number): Matrix2 {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;

    return this;
  }

  Identity(): Matrix2 {
    this.a = 1;
    this.b = 0;
    this.c = 0;
    this.d = 1;
    this.e = 0;
    this.f = 0;

    return this;
  }

  SetTransform(
    x?: number,
    y?: number,
    scaleX?: number,
    scaleY?: number,
    rotation?: number,
    skewX?: number,
    skewY?: number,
    pivotX?: number,
    pivotY?: number
  ): Matrix2 {
    x = x == null ? 0 : x;
    y = y == null ? 0 : y;
    scaleX = scaleX == null ? 1 : scaleX;
    scaleY = scaleY == null ? 1 : scaleY;
    rotation = rotation == null ? 0 : rotation;
    skewX = skewX == null ? 0 : skewX;
    skewY = skewY == null ? 0 : skewY;
    pivotX = pivotX == null ? 0 : pivotX;
    pivotY = pivotY == null ? 0 : pivotY;

    const sineRotation = Sine(rotation);
    const cosineRotation = Cosine(rotation);
    const sineSkewX = -Sine(skewX);
    const cosineSkewX = Cosine(skewX);
    const sineSkewY = Sine(skewY);
    const cosineSkewY = Cosine(skewY);
    const a = cosineRotation * scaleX;
    const b = sineRotation * scaleX;
    const c = -sineRotation * scaleY;
    const d = cosineRotation * scaleY;

    this.a = cosineSkewY * a + sineSkewY * c;
    this.b = cosineSkewY * b + sineSkewY * d;

    this.c = sineSkewX * a + cosineSkewX * c;
    this.d = sineSkewX * b + cosineSkewX * d;

    this.e = x + pivotX * a + pivotY * c;
    this.f = y + pivotX * b + pivotY * d;

    return this;
  }

  Translate(x: number, y: number): Matrix2 {
    this.e += x;
    this.f += y;

    return this;
  }

  TranslateTo(x: number, y: number): Matrix2 {
    this.e = x;
    this.f = y;

    return this;
  }

  ApplyTranslation(x: number, y: number): Matrix2 {
    this.e = x * this.a + y * this.c + this.e;
    this.f = x * this.b + y * this.d + this.f;

    return this;
  }

  ApplyScale(x: number, y: number): Matrix2 {
    this.a *= x;
    this.b *= y;
    this.c *= x;
    this.d *= y;

    return this;
  }

  SetMultiple(a: Matrix2, b: Matrix2): Matrix2 {
    return this.Set(
      a.a * b.a + a.b * b.c,
      a.a * b.a + a.b * b.d,
      a.c * b.a + a.d * b.c,
      a.c * b.b + a.d * b.d,
      a.e * b.a + a.f * b.c + b.e,
      a.e * b.b + a.f * b.d + b.f
    );
  }

  Scale(x: number, y: number): Matrix2 {
    this.a *= x;
    this.b *= y;
    this.c *= x;
    this.d *= y;
    this.e *= x;
    this.f *= y;

    return this;
  }

  Rotate(angle: number): Matrix2 {
    const sine = Sine(angle);
    const cosine = Cosine(angle);
    const { a, c, e } = this;

    this.a = a * cosine - this.b * sine;
    this.b = a * sine + this.b * cosine;
    this.c = c * cosine - this.d * sine;
    this.d = c * sine + this.d * cosine;
    this.e = e * cosine - this.e * sine;
    this.f = e * sine + this.e * cosine;

    return this;
  }

  Decompose(transform: Transform2): Matrix2 {
    const { a, b, c, d } = this;
    const skewX = -Atan2(-c, d);
    const skewY = Atan2(b, a);
    const delta = Abs(skewX + skewY);

    if (delta < Matrix2.PS_EPSILON) {
      transform.rotation = skewY;

      if (a < 0 && d >= 0) {
        transform.rotation += PI;
      }

      transform.SetSkew(0, 0);
    } else {
      transform.SetSkew(skewX, skewY);
    }

    transform.scale.Set(Sqrt(a * a + b * b), Sqrt(c * c + d * d));
    transform.position.Set(this.e, this.f);

    return this;
  }

  AsArray(transpose: boolean): Float32Array {
    const { array } = this;

    if (transpose) {
      array[0] = this.a;
      array[1] = this.b;
      array[2] = 0;
      array[3] = this.c;
      array[4] = this.d;
      array[5] = 0;
      array[6] = this.e;
      array[7] = this.f;
      array[8] = 1;
    } else {
      array[0] = this.a;
      array[1] = this.b;
      array[2] = this.c;
      array[3] = this.d;
      array[4] = this.e;
      array[5] = this.f;
      array[6] = 0;
      array[7] = 0;
      array[8] = 1;
    }

    return array;
  }
}
