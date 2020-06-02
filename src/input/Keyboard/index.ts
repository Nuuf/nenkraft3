/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import Key from 'input/Key';

export default class Keyboard {
  element: HTMLElement;
  keys: Array<Key> = [];
  keysToProcess: Array<Key> = [];
  private _onKeyDown: (e: KeyboardEvent) => void;
  private _onKeyUp: (e: KeyboardEvent) => void;

  constructor(element: HTMLElement) {
    this.element = element;
    element.setAttribute('tabindex', '1');
    element.focus();

    this._onKeyDown = (e: KeyboardEvent): void => {
      e.stopPropagation();
      const { keyCode } = e;
      const { keys } = this;
      var [key] = keys;

      for (var i = 0; i < keys.length; key = keys[++i]) {
        if (key.code === keyCode) {
          key.PushDown();
        }
      }
    };

    this._onKeyUp = (e: KeyboardEvent): void => {
      e.stopPropagation();
    };
  }
}
