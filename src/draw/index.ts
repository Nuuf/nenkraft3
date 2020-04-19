/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import Vector2, { Point2 } from 'math/Vector2';
import { BasicRectangle } from 'geometry/Rectangle';
import { BasicCircle } from 'geometry/Circle';
import { PII } from 'math';

export type DrawOptions = {
  rc: CanvasRenderingContext2D;
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
  tl?: Point2;
  br?: Point2;
  center?: Point2;
  points?: Array<Vector2>;
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

export default class Draw {
  private static PS_LD = [];

  PreDrawBase(options: DrawOptions): Draw {
    const {
      rc,
      identity,
      fillStyle,
      globalAlpha,
      shadowOffsetX,
      shadowOffsetY,
      shadowBlur,
      globalCompositeOpration,
      imageSmoothingEnabled,
    } = options;

    identity && rc.setTransform(1, 0, 0, 1, 0, 0);

    rc.fillStyle = fillStyle ? fillStyle : 'rgb(100, 150, 200)';
    rc.globalAlpha = globalAlpha ? globalAlpha : 0.7;
    rc.shadowOffsetX = shadowOffsetX ? shadowOffsetX : 0;
    rc.shadowOffsetY = shadowOffsetY ? shadowOffsetY : 0;
    rc.shadowBlur = shadowBlur ? shadowBlur : 12;
    rc.globalCompositeOperation = globalCompositeOpration ? globalCompositeOpration : 'source-over';
    rc.imageSmoothingEnabled = imageSmoothingEnabled ? imageSmoothingEnabled : true;

    return this;
  }

  PreDrawText(options: DrawOptions): Draw {
    const { rc, font, textAlign, textBaseline, direction } = options;

    rc.font = font ? font : '10px sans-serif';
    rc.textAlign = textAlign ? textAlign : 'start';
    rc.textBaseline = textBaseline ? textBaseline : 'alphabetic';
    rc.direction = direction ? direction : 'inherit';

    return this;
  }

  PreDrawStroke(options: DrawOptions): Draw {
    const { rc, strokeStyle, lineWidth, lineCap, lineJoin, miterLimit, lineDashOffset, lineDash } = options;

    rc.strokeStyle = strokeStyle ? strokeStyle : 'rgb(200, 150, 100)';
    rc.lineWidth = lineWidth ? lineWidth : 3;
    rc.lineCap = lineCap ? lineCap : 'round';
    rc.lineJoin = lineJoin ? lineJoin : 'round';
    rc.miterLimit = miterLimit ? miterLimit : 10;
    rc.lineDashOffset = lineDashOffset ? lineDashOffset : 0;
    rc.setLineDash(lineDash ? lineDash : Draw.PS_LD);

    return this;
  }

  Rectangle(options: DrawOptions & BasicRectangle): Draw {
    const { rc, stroke, fill, x, y, width, height } = options;
    this.PreDrawBase(options);
    stroke && this.PreDrawStroke(options);
    rc.beginPath();
    rc.rect(x, y, width, height);
    stroke && rc.stroke();
    fill && rc.fill();
    return this;
  }

  /* RoundRectangle(options: DrawOptions & Rectangle & { radius: number }): Draw {
    const { rc, stroke, fill, x, y, radius, width, height } = options;
    const xw = x + width;
    const xh = y + height;
  } */

  Circle(options: DrawOptions & BasicCircle): Draw {
    const {
      rc,
      stroke,
      fill,
      proceed,
      center: { x, y },
      radius,
      anticlockwise,
    } = options;
    this.PreDrawBase(options);
    stroke && this.PreDrawStroke(options);
    !proceed && rc.beginPath();
    rc.arc(x, y, radius, 0, PII, anticlockwise);
    stroke && rc.stroke();
    fill && rc.fill();
    return this;
  }
}
