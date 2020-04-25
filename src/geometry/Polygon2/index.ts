/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import Vector2, { Point2 } from 'math/Vector2';
import AABB2 from 'geometry/AABB2';

export interface BasicPolygon2 {
  vertices: Array<Point2>;
}

export default class Polygon2 implements BasicPolygon2 {
  vertices: Array<Vector2> = [];
  normals: Array<Vector2> = [];
  perimeterMidPoints: Array<Vector2> = [];
  centroid: Vector2 = new Vector2(0, 0);
  boundingBox: AABB2 = new AABB2({ topLeftX: 0, topLeftY: 0, bottomRightX: 0, bottomRightY: 0 });
  private _dirtyBounds = true;
  private _dirtyCentroid = true;
  belongsTo: any;

  constructor({ vertices }: BasicPolygon2) {
    this.CreateVertices(vertices);
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

  private Dirtify(): this {
    this._dirtyBounds = true;
    this._dirtyCentroid = true;
    this.normals.length = 0;
    this.perimeterMidPoints.length = 0;

    return this;
  }
}
