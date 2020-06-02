/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Point2 } from 'math/Vector2';
import { BasicRectangle, BasicRoundRectangle } from 'geometry/Rectangle';
import { BasicCircle, BasicEllipse } from 'geometry/Circle';
import { constants, Matrix2 } from 'math';
import { BasicAABB2 } from 'geometry/AABB2';
import { BasicLine2 } from 'geometry/Line2';
import { ApplyMatrix } from 'utility/functions';

const PII = constants.PII;

export type DrawOptions = {
  rc: CanvasRenderingContext2D;
  transform?: Matrix2;
  identity?: boolean;
  stroke?: boolean;
  fill?: boolean;
  close?: boolean;
  proceed?: boolean;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  radius?: number;
  radiusX?: number;
  radiusY?: number;
  startAngle?: number;
  endAngle?: number;
  anticlockwise?: boolean;
  start?: Point2;
  end?: Point2;
  control1?: Point2;
  control2?: Point2;
  topLeft?: Point2;
  bottomRight?: Point2;
  center?: Point2;
  points?: Array<Point2>;
  fillStyle?: string;
  strokeStyle?: string;
  lineWidth?: number;
  lineCap?: CanvasLineCap;
  lineJoin?: CanvasLineJoin;
  miterLimit?: number;
  lineDashOffset?: number;
  lineDash?: Array<number>;
  globalAlpha?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  shadowBlur?: number;
  globalCompositeOpration?: string;
  imageSmoothingEnabled?: boolean;
  imageSmoothingQuality?: string;
  font?: string;
  textAlign?: CanvasTextAlign;
  textBaseline?: CanvasTextBaseline;
  direction?: CanvasDirection;
  filter?: string;
};

export type ArcParams = {
  startAngle: number;
  endAngle: number;
  anticlosewise: boolean;
};

export type BezierCurveParams = {
  start: Point2;
  control1: Point2;
  control2: Point2;
  end: Point2;
};

export type CurveParams = {
  start: Point2;
  control1: Point2;
  control2: Point2;
  radius: number;
};

export type QuadraticCurveParams = {
  start: Point2;
  control1: Point2;
  end: Point2;
};

export default class Draw2 {
  private static PS_LD = [];

  PreDrawBase(options: DrawOptions): Draw2 {
    const {
      rc,
      identity,
      transform,
      fillStyle,
      globalAlpha,
      shadowOffsetX,
      shadowOffsetY,
      shadowBlur,
      globalCompositeOpration,
      imageSmoothingEnabled,
    } = options;

    identity && rc.setTransform(1, 0, 0, 1, 0, 0);
    transform && ApplyMatrix(rc, transform);

    rc.fillStyle = fillStyle ? fillStyle : 'rgb(100, 150, 200)';
    rc.globalAlpha = globalAlpha ? globalAlpha : 0.7;
    rc.shadowOffsetX = shadowOffsetX ? shadowOffsetX : 0;
    rc.shadowOffsetY = shadowOffsetY ? shadowOffsetY : 0;
    rc.shadowBlur = shadowBlur ? shadowBlur : 12;
    rc.globalCompositeOperation = globalCompositeOpration ? globalCompositeOpration : 'source-over';
    rc.imageSmoothingEnabled = imageSmoothingEnabled ? imageSmoothingEnabled : true;

    return this;
  }

  PreDrawText(options: DrawOptions): Draw2 {
    const { rc, font, textAlign, textBaseline, direction } = options;

    rc.font = font ? font : '10px sans-serif';
    rc.textAlign = textAlign ? textAlign : 'start';
    rc.textBaseline = textBaseline ? textBaseline : 'alphabetic';
    rc.direction = direction ? direction : 'inherit';

    return this;
  }

  PreDrawStroke(options: DrawOptions): Draw2 {
    const { rc, strokeStyle, lineWidth, lineCap, lineJoin, miterLimit, lineDashOffset, lineDash } = options;

    rc.strokeStyle = strokeStyle ? strokeStyle : 'rgb(200, 150, 100)';
    rc.lineWidth = lineWidth ? lineWidth : 3;
    rc.lineCap = lineCap ? lineCap : 'round';
    rc.lineJoin = lineJoin ? lineJoin : 'round';
    rc.miterLimit = miterLimit ? miterLimit : 10;
    rc.lineDashOffset = lineDashOffset ? lineDashOffset : 0;
    rc.setLineDash(lineDash ? lineDash : Draw2.PS_LD);

    return this;
  }

  Rectangle(options: DrawOptions & BasicRectangle): Draw2 {
    const { rc, stroke, fill, x, y, width, height } = options;

    this.PreDrawBase(options);
    stroke && this.PreDrawStroke(options);
    rc.beginPath();
    rc.rect(x, y, width, height);
    stroke && rc.stroke();
    fill && rc.fill();

    return this;
  }

  RoundRectangle(options: DrawOptions & BasicRoundRectangle): Draw2 {
    const { rc, stroke, fill, x, y, radius, width, height } = options;
    const xWidth = x + width;
    const yHeight = y + height;

    this.PreDrawBase(options);
    stroke && this.PreDrawStroke(options);
    rc.beginPath();
    rc.moveTo(x + radius, y);
    rc.lineTo(xWidth - radius, y);
    rc.quadraticCurveTo(xWidth, y, xWidth, y + radius);
    rc.lineTo(xWidth, yHeight - radius);
    rc.quadraticCurveTo(xWidth, yHeight, xWidth - radius, yHeight);
    rc.lineTo(x + radius, yHeight);
    rc.quadraticCurveTo(x, yHeight, x, yHeight - radius);
    rc.lineTo(x, y + radius);
    rc.quadraticCurveTo(x, y, x + radius, y);
    stroke && rc.stroke();
    fill && rc.fill();

    return this;
  }

  AABB(options: DrawOptions & BasicAABB2): Draw2 {
    const { rc, stroke, fill, topLeftX, topLeftY, bottomRightX, bottomRightY } = options;

    this.PreDrawBase(options);
    stroke && this.PreDrawStroke(options);
    rc.beginPath();
    rc.moveTo(topLeftX, topLeftY);
    rc.lineTo(bottomRightX, topLeftY);
    rc.lineTo(bottomRightX, bottomRightY);
    rc.lineTo(topLeftX, bottomRightY);
    stroke && rc.stroke();
    fill && rc.fill();

    return this;
  }

  Circle(options: DrawOptions & BasicCircle): Draw2 {
    const {
      rc,
      stroke,
      fill,
      proceed,
      center: { x, y },
      radius,
    } = options;

    this.PreDrawBase(options);
    stroke && this.PreDrawStroke(options);
    !proceed && rc.beginPath();
    rc.arc(x, y, radius, 0, PII, false);
    stroke && rc.stroke();
    fill && rc.fill();

    return this;
  }

  Ellipse(options: DrawOptions & BasicEllipse): Draw2 {
    const {
      rc,
      stroke,
      fill,
      proceed,
      center: { x, y },
      radiusX,
      radiusY,
    } = options;

    this.PreDrawBase(options);
    stroke && this.PreDrawStroke(options);
    !proceed && rc.beginPath();
    rc.ellipse(x, y, radiusX, radiusY, 0, 0, PII, false);
    stroke && rc.stroke();
    fill && rc.fill();

    return this;
  }

  Line(options: DrawOptions & BasicLine2): Draw2 {
    const { rc, stroke, proceed, start, end } = options;

    this.PreDrawBase(options);
    stroke && this.PreDrawStroke(options);

    if (!proceed) {
      rc.beginPath();
      rc.moveTo(start.x, start.y);
    }

    rc.lineTo(end.x, end.y);
    stroke && rc.stroke();

    return this;
  }

  LineChain(options: DrawOptions & { points: Array<Point2> }): Draw2 {
    const { rc, stroke, fill, points, close } = options;

    this.PreDrawBase(options);
    stroke && this.PreDrawStroke(options);
    rc.beginPath();
    rc.moveTo(points[0].x, points[0].y);

    for (var i = 1; i < points.length; ++i) {
      rc.lineTo(points[i].x, points[i].y);
    }

    close && rc.closePath();
    stroke && rc.stroke();
    fill && rc.fill();

    return this;
  }

  Arc(options: DrawOptions & BasicCircle & ArcParams): Draw2 {
    const {
      rc,
      stroke,
      fill,
      proceed,
      center: { x, y },
      radius,
      startAngle,
      endAngle,
      anticlockwise,
    } = options;

    this.PreDrawBase(options);
    stroke && this.PreDrawStroke(options);
    !proceed && rc.beginPath();
    rc.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    close && rc.closePath();
    stroke && rc.stroke();
    fill && rc.fill();

    return this;
  }

  EllipticArc(options: DrawOptions & BasicEllipse & ArcParams): Draw2 {
    const {
      rc,
      stroke,
      fill,
      proceed,
      center: { x, y },
      radiusX,
      radiusY,
      startAngle,
      endAngle,
      anticlockwise,
    } = options;

    this.PreDrawBase(options);
    stroke && this.PreDrawStroke(options);
    !proceed && rc.beginPath();
    rc.ellipse(x, y, radiusX, radiusY, 0, startAngle, endAngle, anticlockwise);
    close && rc.closePath();
    stroke && rc.stroke();
    fill && rc.fill();

    return this;
  }

  Curve(options: DrawOptions & CurveParams): Draw2 {
    const { rc, stroke, fill, proceed, start, control1, control2, radius } = options;

    this.PreDrawBase(options);

    if (!proceed) {
      rc.beginPath();
      rc.moveTo(start.x, start.y);
    }

    rc.arcTo(control1.x, control1.y, control2.x, control2.y, radius);
    close && rc.closePath();
    stroke && rc.stroke();
    fill && rc.fill();

    return this;
  }

  BezierCurve(options: DrawOptions & BezierCurveParams): Draw2 {
    const { rc, stroke, fill, proceed, start, end, control1, control2 } = options;

    this.PreDrawBase(options);

    if (!proceed) {
      rc.beginPath();
      rc.moveTo(start.x, start.y);
    }

    rc.bezierCurveTo(control1.x, control1.y, control2.x, control2.y, end.x, end.y);
    close && rc.closePath();
    stroke && rc.stroke();
    fill && rc.fill();

    return this;
  }

  QuadraticCurve(options: DrawOptions & QuadraticCurveParams): Draw2 {
    const { rc, stroke, fill, proceed, start, end, control1 } = options;

    this.PreDrawBase(options);

    if (!proceed) {
      rc.beginPath();
      rc.moveTo(start.x, start.y);
    }

    rc.quadraticCurveTo(control1.x, control1.y, end.x, end.y);
    close && rc.closePath();
    stroke && rc.stroke();
    fill && rc.fill();

    return this;
  }
}
