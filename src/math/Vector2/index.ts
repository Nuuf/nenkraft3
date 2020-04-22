/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import Pool from 'utility/Pool';

const { abs: Abs, sqrt: Sqrt, sin: Sine, cos: Cosine, atan2: Atan2, ceil: Ceil, round: Round } = Math;

export interface Point2 {
  x: number;
  y: number;
}

export default class Vector2 implements Point2 {
  x: number;
  y: number;

  private static PS_POOL: Pool<Vector2> = new Pool(() => new Vector2(0, 0), 1000);
  private static PS_USE_POOL = true;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static get POOL(): Pool<Vector2> {
    return Vector2.PS_POOL;
  }

  static get USE_POOL(): boolean {
    return Vector2.PS_USE_POOL;
  }

  static set USE_POOL(flag) {
    Vector2.PS_USE_POOL = !!flag;
  }

  static FromPool(x: number, y: number): Vector2 {
    if (Vector2.USE_POOL) {
      return Vector2.PS_POOL.Retrieve().Set(x, y);
    }

    return new Vector2(x, y);
  }

  static GetAngleBetween(a: Point2 | Vector2, b: Point2 | Vector2): number {
    return Atan2(a.y - b.y, a.x - b.y);
  }

  static GetDotProduct(a: Point2 | Vector2, b: Point2 | Vector2): number {
    return a.x * b.x + a.y * b.y;
  }

  static GetCrossProduct(a: Point2 | Vector2, b: Point2 | Vector2): number {
    return a.x * b.y + a.y * b.x;
  }

  static GetDistanceSquaredBetween(a: Point2 | Vector2, b: Point2 | Vector2): number {
    const x = a.x - b.x;
    const y = a.y - b.y;

    return x * x + y * y;
  }

  static GetDistanceBetween(a: Point2 | Vector2, b: Point2 | Vector2): number {
    return Sqrt(Vector2.GetDistanceSquaredBetween(a, b));
  }

  static GetMidpoint(a: Vector2, b: Vector2): Vector2 {
    return a.Copy().AddV(b).Multiply(0.5, 0.5);
  }

  static GetPerpendicularCW(a: Point2 | Vector2, b: Point2 | Vector2): Vector2 {
    return Vector2.FromPool(b.y - a.y, -(b.x - a.x));
  }

  static GetPerpendicularCCW(a: Point2 | Vector2, b: Point2 | Vector2): Vector2 {
    return Vector2.FromPool(-(b.y - a.y), b.x - a.x);
  }

  static GetNormalA(a: Point2 | Vector2, b: Point2 | Vector2): Vector2 {
    return Vector2.GetPerpendicularCCW(a, b).Normalize();
  }

  static GetNormalB(a: Point2 | Vector2, b: Point2 | Vector2): Vector2 {
    return Vector2.GetPerpendicularCW(a, b).Normalize();
  }

  static Reflect(a: Vector2, b: Vector2): Vector2 {
    const ref = b.Copy();
    const dot = Vector2.GetDotProduct(a, b);

    ref.Multiply(2, 2).Multiply(dot, dot);

    return a.SubtractVC(ref);
  }

  static Project(a: Vector2, b: Vector2): Vector2 {
    const dot = Vector2.GetDotProduct(a, b);

    if (dot === 0) return Vector2.FromPool(0, 0);
    const { magnitude } = b;
    const scale = dot / (magnitude * magnitude);

    return b.Copy().Multiply(scale, scale);
  }

  // x = minimum, y = maximum
  static GetMinMaxDotProduct(v: Vector2, vectors: Array<Vector2>): Vector2 {
    let min = Infinity;
    let max = -min;
    let dot = 0;
    const result = v.Copy();

    for (var i = 0; i < vectors.length; ++i) {
      dot = Vector2.GetDotProduct(vectors[i], result);
      if (dot > max) max = dot;
      if (dot < min) min = dot;
    }

    return result.Set(min, max);
  }

  static AddTo(v: Vector2, vectors: Array<Vector2>): Vector2 {
    for (var i = 0; i < vectors.length; ++i) {
      vectors[i].AddV(v);
    }

    return v;
  }

  static AreEqual(a: Point2 | Vector2, b: Point2 | Vector2): boolean {
    return a.x === b.x && a.y === b.y;
  }

  static SortByMinimumMagnitude(a: Vector2, b: Vector2): number {
    return a.magnitudeSquared - b.magnitudeSquared;
  }

  get magnitudeSquared(): number {
    return this.x * this.x + this.y * this.y;
  }

  get magnitude(): number {
    return Sqrt(this.magnitudeSquared);
  }

  get is0(): boolean {
    return this.x === 0 && this.y === 0;
  }

  get angle(): number {
    return Atan2(this.y, this.x);
  }

  Copy(): Vector2 {
    if (Vector2.USE_POOL) {
      return Vector2.PS_POOL.Retrieve().Set(this.x, this.y);
    }

    return new Vector2(this.x, this.y);
  }

  AbsoluteCopy(): Vector2 {
    return this.Copy().Positive();
  }

  Set(x: number, y: number): this {
    this.x = x;
    this.y = y;

    return this;
  }

  SetV(v: Point2 | Vector2): this {
    return this.Set(v.x, v.y);
  }

  SetSame(xy: number): this {
    this.x = this.y = xy;

    return this;
  }

  Add(x: number, y: number): this {
    this.x += x;
    this.y += y;

    return this;
  }

  AddV(v: Point2 | Vector2): this {
    return this.Add(v.x, v.y);
  }

  AddVC(v: Point2 | Vector2): Vector2 {
    return this.Copy().AddV(v);
  }

  Subtract(x: number, y: number): this {
    this.x -= x;
    this.y -= y;

    return this;
  }

  SubtractV(v: Point2 | Vector2): this {
    return this.Subtract(v.x, v.y);
  }

  SubtractVC(v: Point2 | Vector2): Vector2 {
    return this.Copy().MultiplyV(v);
  }

  Divide(x: number, y: number): this {
    this.x /= x;
    this.y /= y;

    return this;
  }

  DivideV(v: Point2 | Vector2): this {
    return this.Divide(v.x, v.y);
  }

  DivideVC(v: Point2 | Vector2): Vector2 {
    return this.Copy().DivideV(v);
  }

  Multiply(x: number, y: number): this {
    this.x *= x;
    this.y *= y;

    return this;
  }

  MultiplyV(v: Point2 | Vector2): this {
    return this.Multiply(v.x, v.y);
  }

  MultiplyVC(v: Point2 | Vector2): Vector2 {
    return this.Copy().MultiplyV(v);
  }

  Positive(): this {
    this.x = Abs(this.x);
    this.y = Abs(this.y);

    return this;
  }

  Negative(): this {
    this.x = -Abs(this.x);
    this.y = -Abs(this.y);

    return this;
  }

  Normalize(): this {
    const { magnitude } = this;

    return this.Divide(magnitude, magnitude);
  }

  Floor(): this {
    this.x = this.x | 0;
    this.y = this.y | 0;

    return this;
  }

  Ceil(): this {
    this.x = Ceil(this.x);
    this.y = Ceil(this.y);

    return this;
  }

  Round(): this {
    this.x = Round(this.x);
    this.y = Round(this.y);

    return this;
  }

  Invert(): this {
    this.x = -this.x;
    this.y = -this.y;

    return this;
  }

  Rotate(angle: number): this {
    const sine = Sine(angle);
    const cosine = Cosine(angle);

    this.x = this.x * cosine - this.y * sine;
    this.y = this.x * sine + this.y * cosine;

    return this;
  }

  RotateAround(x: number, y: number, angle: number): this {
    return this.Subtract(x, y).Rotate(angle).Add(x, y);
  }

  RotateAroundV(v: Point2 | Vector2, angle: number): this {
    return this.RotateAround(v.x, v.y, angle);
  }

  RotateAbsolute(angle: number): this {
    return this.Rotate(angle - this.angle);
  }

  RotateAbsoluteAround(x: number, y: number, angle: number): this {
    return this.Subtract(x, y).RotateAbsolute(angle).Add(x, y);
  }

  RotateAbsoluteAroundV(v: Point2 | Vector2, angle: number): this {
    return this.RotateAbsoluteAround(v.x, v.y, angle);
  }

  Store(): Vector2 {
    Vector2.PS_POOL.Store(this);

    return this;
  }
}
