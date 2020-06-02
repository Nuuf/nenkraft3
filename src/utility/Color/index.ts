/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Clamp, Base16ToBase10 } from 'utility/functions';

const { max: Max, min: Min, round: Round } = Math;

export enum ColorConversions {
  RGB = 'RGB',
  HSL = 'HSL',
}

export default class Color {
  channel: Float32Array;
  value = '';
  currentConversion: ColorConversions = ColorConversions.RGB;

  constructor(r = 0, g = 0, b = 0, a = 1) {
    this.channel = new Float32Array([r, g, b, a]);
  }

  private static PS_MAX_VAL = 255;
  private static PS_MIN_VAL = 0;
  private static PS_NORM = 1 / Color.PS_MAX_VAL;

  static Mix(a: Color, b: Color, percentage: number): Color {
    const pb = 1 - percentage;
    const ca = a.channel;
    const cb = b.channel;

    return new Color(
      ca[0] * percentage + cb[0] * pb,
      ca[1] * percentage + cb[1] * pb,
      ca[2] * percentage + cb[2] * pb,
      ca[3] * percentage + cb[3] * pb
    );
  }

  get r(): number {
    return this.channel[0];
  }

  get g(): number {
    return this.channel[1];
  }

  get b(): number {
    return this.channel[2];
  }

  get a(): number {
    return this.channel[3];
  }

  Copy(): Color {
    const { channel, value, currentConversion } = this;
    const color = new Color(channel[0], channel[1], channel[2], channel[3]);

    color.value = value;
    color.currentConversion = currentConversion;

    return color;
  }

  ComputeValueRGBA(): this {
    this.value = `rgba(${this.channel.join(',')})`;

    return this;
  }

  ComputeValueHSLA(): this {
    const { channel } = this;

    this.value = `hsla(${channel[0]},${channel[1]}%,${channel[2]}%,${channel[3]}})`;

    return this;
  }

  ComputeValueHex(): this {
    const { channel } = this;

    this.value = `#${channel[0].toString(16)}${channel[1].toString(16)}${channel[2].toString(16)}}`;

    return this;
  }

  ConvertToHSLA(round: boolean): this {
    const { channel } = this;
    let h = 0;
    let s = 0;
    const r = channel[0] / Color.PS_MAX_VAL;
    const g = channel[1] / Color.PS_MAX_VAL;
    const b = channel[2] / Color.PS_MAX_VAL;
    const max = Max(r, g, b);
    const min = Min(r, g, b);
    const maxnmin = max - min;
    const maxpmin = max + min;
    const l = maxpmin * 0.5;

    if (max !== min) {
      s = l > 0.5 ? maxnmin / (2 - max - min) : maxnmin / (max + min);
      if (max === r) h = (g - b) / maxnmin + (g < b ? 6 : 0);
      else if (max === g) h = (b - r) / maxnmin + 2;
      else h = (r - g) / maxnmin + 4;
      h /= 6;
    }

    (channel[0] = h * 360), (channel[1] = s * 100), (channel[2] = l * 100);

    if (round === true) {
      channel[0] = Round(channel[0]);
      channel[1] = Round(channel[1]);
      channel[2] = Round(channel[2]);
    }

    this.currentConversion = ColorConversions.HSL;

    return this.ComputeValueHSLA();
  }

  SetRGB(r: number, g: number, b: number, compute = true): this {
    const { channel } = this;
    const { PS_MAX_VAL, PS_MIN_VAL } = Color;

    channel[0] = Clamp(r, PS_MIN_VAL, PS_MAX_VAL);
    channel[1] = Clamp(g, PS_MIN_VAL, PS_MAX_VAL);
    channel[2] = Clamp(b, PS_MIN_VAL, PS_MAX_VAL);
    this.currentConversion = ColorConversions.RGB;
    if (compute === true) return this.ComputeValueRGBA();

    return this;
  }

  SetRGBA(r: number, g: number, b: number, a: number): this {
    this.SetRGB(r, g, b);
    this.channel[3] = Clamp(a, 0, 1);

    return this.ComputeValueRGBA();
  }

  SetHex(hex: string): this {
    hex = hex.replace(/#/g, '');
    const strs = hex.match(/.{2}/g);

    if (strs) {
      const mapped = strs.map(Base16ToBase10);

      if (mapped[3] == null) mapped[3] = 1;
      this.SetRGBA(mapped[0], mapped[1], mapped[2], mapped[3]);
    }

    return this;
  }

  IncreaseChannel(channel: number, value: number): this {
    this.channel[channel] += value;
    if (this.currentConversion === ColorConversions.RGB) this.ComputeValueRGBA();
    else if (this.currentConversion === ColorConversions.HSL) this.ComputeValueHSLA();

    return this;
  }

  SetChannel(channel: number, value: number): this {
    this.channel[channel] = value;
    if (this.currentConversion === ColorConversions.RGB) this.ComputeValueRGBA();
    else if (this.currentConversion === ColorConversions.HSL) this.ComputeValueHSLA();

    return this;
  }

  SetSame(value: number): this {
    const { channel } = this;

    channel[0] = channel[1] = channel[2] = value;

    if (this.currentConversion === ColorConversions.RGB) this.ComputeValueRGBA();
    else if (this.currentConversion === ColorConversions.HSL) this.ComputeValueHSLA();

    return this;
  }

  Normalize(): this {
    const { channel } = this;
    const { PS_NORM } = Color;

    channel[0] = PS_NORM * channel[0];
    channel[1] = PS_NORM * channel[1];
    channel[2] = PS_NORM * channel[2];

    return this;
  }
}
