/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export type FlushHandle<T> = (object: T) => void;
export type FloodHandle<T> = () => T;

export default class Pool<T> {
  objects: Array<T> = [];
  floodFunction: FloodHandle<T>;
  floodAmount: number;
  context: any;

  constructor(floodFunction: FloodHandle<T>, floodAmount = 10, context?: any) {
    this.floodFunction = floodFunction;
    this.floodAmount = floodAmount;
    this.context = context;
  }

  Store(object: T): this {
    this.objects.push(object);

    return this;
  }

  PreRetrieve(): this {
    if (this.objects.length === 0) {
      this.Flood();
    }

    return this;
  }

  Retrieve(): T {
    return this.PreRetrieve().objects.pop() as T;
  }

  Flood(func?: FloodHandle<T>, amount?: number, context?: any): this {
    if (func) this.floodFunction = func;
    if (amount) this.floodAmount = amount;
    if (context) this.context = context;

    for (var i = 0; i < this.floodAmount; ++i) {
      this.Store(this.floodFunction.call(this.context));
    }

    return this;
  }

  Flush(handle?: FlushHandle<T>): this {
    const { objects } = this;

    if (handle) {
      for (var i = 0; i < objects.length; ++i) {
        handle(objects[i]);
      }
    }

    objects.length = 0;

    return this;
  }

  Clean(handle?: FlushHandle<T>): this {
    const amount = this.objects.length;

    return this.Flush(handle).Flood(undefined, amount);
  }
}
