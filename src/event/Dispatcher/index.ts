/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import Listener, { ListenerHandle } from 'event/Listener';
import { FickleDelete } from 'utility/functions';

export default class Dispatcher<T, C> {
  listeners: Array<Listener<T, C>> = [];
  stopPropagation = false;
  target: T | null = null;
  data: C | null = null;

  GetListenerIndex(handle: ListenerHandle<T, C>, context: any): number {
    const { listeners } = this;
    let listener;

    if (listeners.length === 0) return -1;

    for (var i = 0; i < listeners.length; ++i) {
      listener = listeners[i];

      if (listener.context === context && listener.handle === handle) {
        return i;
      }
    }

    return -1;
  }

  Add(handle: ListenerHandle<T, C>, context?: any, removeOnNextCall = false): void {
    this.listeners.push(new Listener(this, context, handle, removeOnNextCall));
  }

  Once(handle: ListenerHandle<T, C>, context?: any): void {
    this.Add(handle, context, true);
  }

  Remove(handle: ListenerHandle<T, C>, context?: any): void {
    const index = this.GetListenerIndex(handle, context);

    if (index !== -1) FickleDelete(this.listeners, index);
  }

  Dump(context?: any): void {
    const { listeners } = this;
    let listener;

    if (context != undefined) {
      for (var i = 0; i < listeners.length; ++i) {
        listener = listeners[i];

        if (listener.context === context) {
          FickleDelete(listeners, i);
        }
      }
    } else {
      listeners.length = 0;
    }
  }

  Dispatch(target: T, data: C): void {
    const listeners = this.listeners.slice();

    if (listeners.length === 0) return;

    this.target = target;
    this.data = data;

    for (var i = 0, stop = false; i < listeners.length; ++i) {
      stop = !!listeners[i].Execute(this);
      if (this.stopPropagation === true || stop === true) break;
    }

    this.target = null;
    this.data = null;
  }
}
