/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import PrecisionRound from 'math/functions/PrecisionRound';

export type OnProcessHandler = (delta: number) => void;

export enum TickerTypes {
  INTERVAL,
  ANIMATION_FRAME,
  ACCURATE_INTERVAL,
}

export type TickerFunctions = {
  requestAnimationFrame(callback: FrameRequestCallback): number;
  setImmediate: (callback: (...args: any[]) => void, ...args: any[]) => NodeJS.Immediate;
  setInterval: (callback: (...args: any[]) => void, ms: number, ...args: any[]) => NodeJS.Timeout;
  setTimeout: (callback: (...args: any[]) => void, ms: number, ...args: any[]) => NodeJS.Timeout;
  cancelAnimationFrame(handle: number): void;
  clearImmediate: (immediateId: NodeJS.Immediate) => void;
  clearInterval: (intervalId: NodeJS.Timeout) => void;
  clearTimeout: (timeoutId: NodeJS.Timeout) => void;
};

export default class Ticker {
  onProcess: OnProcessHandler;
  delta = 0;
  then = 0;
  now = 0;
  desiredRate = 0;
  type: TickerTypes | null = null;
  issuedStop = false;
  global: TickerFunctions;

  private _afId: number | null = null;
  private _intervalId: NodeJS.Timeout | null = null;
  private _immediateId: NodeJS.Immediate | null = null;
  private _timeoutId: NodeJS.Timeout | null = null;

  private _process: () => void;
  private _processAccurate: () => void;
  private _processAnimationFrame: () => void;

  constructor(onProcess: OnProcessHandler, rate = 60, run = true, global: TickerFunctions) {
    this.onProcess = onProcess;
    this.SetDesiredRate(rate);
    this.global = global;

    this._process = (): void => {
      this.onProcess(this.ComputeDelta());
    };

    this._processAccurate = (): void => {
      if (this.issuedStop === true) return;
      this.now = Date.now();

      if (this.then + this.desiredRate <= this.now) {
        this.delta = this.now - this.then;
        this.then = this.now;
        this.onProcess(this.delta);
      }

      if (this.now - this.then < this.desiredRate - 16) {
        this._timeoutId = this.global.setTimeout(this._processAccurate, 0);
      } else {
        this._immediateId = this.global.setImmediate(this._processAccurate);
      }
    };

    this._processAnimationFrame = (): void => {
      this.onProcess(this.ComputeDelta());
      if (this._afId === null) return;

      this._afId = this.global.requestAnimationFrame(this._processAnimationFrame);
    };

    if (run === true) {
      this.StartAnimationFrameRequest();
    }
  }

  ComputeDelta(): number {
    this.now = Date.now();
    this.delta = this.now - this.then;
    this.then = this.now;

    return this.delta;
  }

  SetDesiredRate(rate: number): this {
    this.desiredRate = 1000 / rate;

    return this;
  }

  IsRunning(): boolean {
    if (this.type !== null) {
      return true;
    }

    return false;
  }

  GetTPS(): number {
    return PrecisionRound((1 / this.desiredRate) * 1000, 2);
  }

  Stop(): void {
    if (this._intervalId != null) {
      this.global.clearInterval(this._intervalId);
      this._intervalId = null;
    }

    if (this._afId != null) {
      this.global.cancelAnimationFrame(this._afId);
      this._afId = null;
    }

    if (this._immediateId != null) {
      this.global.clearImmediate(this._immediateId);
      this._immediateId = null;
    }

    if (this._timeoutId != null) {
      this.global.clearTimeout(this._timeoutId);
      this._timeoutId = null;
    }

    this.issuedStop = true;

    this.type = null;
  }

  Start(): void {
    if (this.IsRunning() === true) return;
    this.now = this.then = Date.now();
    this._intervalId = this.global.setInterval(this._process, this.desiredRate);
    this.type = TickerTypes.INTERVAL;
  }

  StartAccurate(): void {
    if (this.IsRunning() === true) return;
    this.issuedStop = false;
    this.now = this.then = Date.now();
    this._timeoutId = this.global.setTimeout(this._processAccurate, 0);
    this.type = TickerTypes.ACCURATE_INTERVAL;
  }

  StartAnimationFrameRequest(): void {
    if (this.IsRunning() === true) return;
    this.now = this.then = Date.now();
    this._afId = this.global.requestAnimationFrame(this._processAnimationFrame);
    this.type = TickerTypes.ANIMATION_FRAME;
  }
}
