/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
export type FlushHandle<T> = (object: T) => void;

export default class Pool<T> {
  objects: Array<T> = [];
  floodFunction: () => T;
  floodAmount: number;
  context: any;
  constructor(floodFunction: () => T, floodAmount = 10, context?: any) {
    this.floodFunction = floodFunction;
    this.floodAmount = floodAmount;
    this.context = context;
  }
  Store(object: T): Pool<T> {
    this.objects.push(object);
    return this;
  }
  PreRetrieve(): Pool<T> {
    if (this.objects.length === 0) {
      this.Flood();
    }
    return this;
  }
  Retrieve(): T {
    return this.PreRetrieve().objects.pop() as T;
  }
  Flood(func?: () => T, amount?: number, context?: any): Pool<T> {
    if (func) this.floodFunction = func;
    if (amount) this.floodAmount = amount;
    if (context) this.context = context;

    for (let i = 0; i < this.floodAmount; ++i) {
      this.Store(this.floodFunction.call(this.context));
    }
    return this;
  }
  Flush(handle?: FlushHandle<T>): Pool<T> {
    const { objects } = this;
    if (handle) {
      for (let i = 0; i < objects.length; ++i) {
        handle(objects[i]);
      }
    }
    objects.length = 0;
    return this;
  }
  Clean(handle?: FlushHandle<T>): Pool<T> {
    const amount = this.objects.length;
    return this.Flush(handle).Flood(undefined, amount);
  }
}
