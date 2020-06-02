/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import DrawableContainer2 from 'entity/DrawableContainer2';
import { Matrix2 } from 'math';
import { Dispatcher } from 'event';
import { Ticker } from 'time';
import { DEFAULT } from 'utility/gco';
import { PrecisionRound } from 'math/functions';

export type Stage2Options = {
  canvas: HTMLCanvasElement | string;
};

export default class Stage2 extends DrawableContainer2 {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  id = '';
  backgroundColor = 'rgba(10,20,30,1)';
  clear = true;
  fill = true;
  usingWebGL = false;
  glConversionMatrix = new Matrix2();
  ticker: Ticker;
  onProcess = new Dispatcher<Stage2, number>();

  private _process: (delta: number) => void;

  constructor({ canvas }: Stage2Options) {
    super(0, 0);

    if (typeof canvas === 'string') {
      canvas = document.getElementById(canvas) as HTMLCanvasElement;
    }

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.SetSourceSize(canvas.width, canvas.height);

    this._process = (delta): void => {
      this.PreRender(this.ctx);
      this.Render(this.ctx);
      this.onProcess.Dispatch(this, delta);
    };

    this.ticker = new Ticker(this._process, 60, true, window);
  }

  PreRender(ctx: CanvasRenderingContext2D): this {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = DEFAULT;

    const { width, height } = this.canvas;

    if (this.fill === true) {
      ctx.fillStyle = this.backgroundColor;
      ctx.fillRect(0, 0, width, height);
    } else if (this.clear === true) {
      ctx.clearRect(0, 0, width, height);
    }

    return this;
  }

  Destroy(): this {
    this.ticker.Stop();

    return super.Destroy();
  }

  DisplayFPS(): () => void {
    const box = document.createElement('div', { is: 'div' });

    box.style.position = 'fixed';
    box.style.top = '0';
    box.style.right = '0';
    box.style.textAlign = 'right';
    box.style.backgroundColor = 'red';
    box.style.color = 'white';
    box.style.width = '200px';
    box.style.padding = '10px';
    box.style.fontSize = '20px';

    document.body.appendChild(box);

    let previousDelta = 0;
    const handle = (event: Dispatcher<Stage2, number>): void => {
      const delta = event.data ? event.data : 0;

      if (previousDelta !== delta) {
        box.innerHTML = `${delta} -> Delta <br> ${PrecisionRound(1000 / delta, 0)} -> FPS`;
        previousDelta = delta;
      }
    };

    this.onProcess.Add(handle);

    return (): void => {
      box.remove();
      this.onProcess.Remove(handle);
    };
  }
}
