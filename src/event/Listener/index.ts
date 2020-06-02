/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import Dispatcher from 'event/Dispatcher';

export type ListenerHandle<T, C> = (dispatcher: Dispatcher<T, C>) => boolean | void;

export default class Listener<T, C> {
  dispatcher: Dispatcher<T, C>;
  context: any;
  handle: ListenerHandle<T, C>;
  removeOnNextCall: boolean;

  constructor(dispatcher: Dispatcher<T, C>, context: any, handle: ListenerHandle<T, C>, removeOnNextCall = false) {
    this.dispatcher = dispatcher;
    this.context = context;
    this.handle = handle;
    this.removeOnNextCall = removeOnNextCall;
  }

  Execute(dispatcher: Dispatcher<T, C>): boolean | void {
    const stop = this.handle.call(this.context, dispatcher);

    this.removeOnNextCall === true && this.Remove();

    return stop;
  }

  Remove(): void {
    this.dispatcher.Remove(this.handle, this.context);
  }
}
