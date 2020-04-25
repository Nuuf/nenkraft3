/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import FillStyle, { FillStyleParams } from './FillStyle';
import StrokeStyle, { StrokeStyleParams } from './StrokeStyle';
import ShadowStyle, { ShadowStyleParams } from './ShadowStyle';

export type AllStyles = {
  fill: FillStyle;
  stroke: StrokeStyle;
  shadow: ShadowStyle;
};

export type AllStylesParams = {
  fill?: FillStyleParams;
  stroke?: StrokeStyleParams;
  shadow?: ShadowStyleParams;
};

export type FillStrokeShadowStyles = {
  fill: FillStyle;
  stroke: StrokeStyle;
  shadow: ShadowStyle;
};

export type FillStrokeShadowStylesParams = {
  fill?: FillStyleParams;
  stroke?: StrokeStyleParams;
  shadow?: ShadowStyleParams;
};

export type StrokeShadowStyles = {
  stroke: StrokeStyle;
  shadow: ShadowStyle;
};

export type StrokeShadowStylesParams = {
  stroke?: StrokeStyleParams;
  shadow?: ShadowStyleParams;
};

export type FillShadowStyles = {
  fill: FillStyle;
  shadow: ShadowStyle;
};

export type FillShadowStylesParams = {
  fill?: FillStyleParams;
  shadow?: ShadowStyleParams;
};

export function All({ fill, stroke, shadow }: AllStylesParams): AllStyles {
  return {
    fill: new FillStyle(fill || {}),
    stroke: new StrokeStyle(stroke || {}),
    shadow: new ShadowStyle(shadow || {}),
  };
}

export function FSSa({ fill, stroke, shadow }: FillStrokeShadowStylesParams): FillStrokeShadowStyles {
  return {
    fill: new FillStyle(fill || {}),
    stroke: new StrokeStyle(stroke || {}),
    shadow: new ShadowStyle(shadow || {}),
  };
}

export function SSa({ stroke, shadow }: StrokeShadowStylesParams): StrokeShadowStyles {
  return {
    stroke: new StrokeStyle(stroke || {}),
    shadow: new ShadowStyle(shadow || {}),
  };
}

export function FSa({ fill, shadow }: FillShadowStylesParams): FillShadowStyles {
  return {
    fill: new FillStyle(fill || {}),
    shadow: new ShadowStyle(shadow || {}),
  };
}
