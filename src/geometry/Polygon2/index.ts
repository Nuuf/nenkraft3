/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import Vector2, { Point2 } from 'math/Vector2';
import AABB2 from 'geometry/AABB2';
import { Shape2 } from 'geometry/Shape2';

export interface BasicPolygon2 {
  vertices: Array<Point2>;
}

export default class Polygon2 implements BasicPolygon2, Shape2 {
  vertices: Array<Vector2> = [];
  normals: Array<Vector2> = [];
  perimeterMidPoints: Array<Vector2> = [];
  centroid: Vector2 = Vector2.FromPool(0, 0);
  boundingBox: AABB2 = new AABB2({ topLeftX: 0, topLeftY: 0, bottomRightX: 0, bottomRightY: 0 });
  belongsTo: any;
  private _dirtyBounds = true;
  private _dirtyCentroid = true;

  private static PS_AP = Vector2.FromPool(0, 0);

  constructor({ vertices }: BasicPolygon2) {
    this.CreateVertices(vertices);
  }

  get width(): number {
    if (this._dirtyBounds === true) this.ComputeBounds();

    return this.boundingBox.width;
  }

  get height(): number {
    if (this._dirtyBounds === true) this.ComputeBounds();

    return this.boundingBox.height;
  }

  Copy(): Polygon2 {
    return new Polygon2(this);
  }

  Set(vertices: Array<Point2>): this {
    return this.CreateVertices(vertices);
  }

  SetWith({ vertices }: BasicPolygon2): this {
    return this.Set(vertices);
  }

  Scale(x: number, y: number): this {
    const { vertices, centroid, boundingBox } = this;
    const l = vertices.length;

    if (this._dirtyCentroid === true) {
      this.ComputeCentroid();
    }

    if (this._dirtyBounds === true) {
      this.ComputeBounds();
    }

    const magnitude = (x + y) * 0.5 * ((boundingBox.width + boundingBox.height) * 0.5);

    for (var i = 0; i < l; ++i) {
      vertices[i] = Vector2.Push(vertices[i], centroid, magnitude);
    }

    this._dirtyBounds = true;
    this._dirtyCentroid = true;

    return this;
  }

  AddVertex(v: Vector2): this {
    this.vertices.push(v);

    return this.Dirtify();
  }

  CreateVertex(p: Point2): this {
    return this.AddVertex(Vector2.FromPool(p.x, p.y));
  }

  AddVertices(vertices: Array<Vector2>): this {
    this.vertices.push(...vertices);

    return this.Dirtify();
  }

  CreateVertices(vertices: Array<Point2>): this {
    for (var i = 0; i < vertices.length; ++i) {
      this.CreateVertex(vertices[i]);
    }

    return this;
  }

  Nullify(): this {
    this.vertices.length = 0;

    return this.Dirtify();
  }

  SetPosition(x: number, y: number): this {
    const { vertices, centroid } = this;
    const l = vertices.length;

    if (this._dirtyCentroid === true) {
      this.ComputeCentroid();
    }

    for (var i = 0; i < l; ++i) {
      vertices[i].SubtractV(centroid).Add(x, y);
    }

    this._dirtyCentroid = true;
    this._dirtyBounds = true;

    return this;
  }

  Rotate(angle: number, anchorX = 0.5, anchorY = 0.5): this {
    const { vertices, boundingBox } = this;
    const ap = Polygon2.PS_AP;

    if (this._dirtyBounds === true) {
      this.ComputeBounds();
    }

    ap.Set(boundingBox.topLeftX, boundingBox.topLeftY);
    ap.Add(boundingBox.bottomRightX, boundingBox.bottomRightY);
    ap.Multiply(anchorX, anchorY);

    for (var i = 0; i < vertices.length; ++i) {
      vertices[i].RotateAroundV(ap, angle);
    }

    this._dirtyBounds = true;
    this._dirtyCentroid = true;

    return this;
  }

  ComputeBounds(): this {
    const { vertices } = this;
    let mix = Infinity;
    let max = -mix;
    let miy = mix;
    let may = -mix;
    let [vertex] = vertices;

    for (var i = 1; i < vertices.length; vertex = vertices[++i]) {
      if (vertex.x < mix) mix = vertex.x;
      if (vertex.x > max) max = vertex.x;
      if (vertex.y < miy) miy = vertex.y;
      if (vertex.y > may) may = vertex.y;
    }

    this.boundingBox.Set(mix, miy, max, may);
    this._dirtyBounds = false;

    return this;
  }

  ComputeCentroid(): this {
    const { vertices, centroid } = this;
    const l = vertices.length;

    centroid.SetSame(0);

    for (var i = 0; i < l; ++i) {
      centroid.AddV(vertices[i]);
    }

    centroid.Divide(l, l);
    this._dirtyCentroid = false;

    return this;
  }

  IntersectsPoint2(p: Point2): boolean {
    if (this._dirtyBounds === true) this.ComputeBounds();
    if (this.boundingBox.IntersectsPoint2(p) === false) return false;

    let vertexi;
    let vertexj;
    let intersects = false;
    const { vertices } = this;
    const { x, y } = p;

    for (var i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
      vertexi = vertices[i];
      vertexj = vertices[j];

      if (
        vertexi.y > y !== vertexj.y > y &&
        x < ((vertexj.x - vertexi.x) * (y - vertexi.y)) / (vertexj.y - vertexi.y) + vertexi.x
      ) {
        intersects = !intersects;
      }
    }

    return intersects;
  }

  private Dirtify(): this {
    this._dirtyBounds = true;
    this._dirtyCentroid = true;
    this.normals.length = 0;
    this.perimeterMidPoints.length = 0;

    return this;
  }
}
