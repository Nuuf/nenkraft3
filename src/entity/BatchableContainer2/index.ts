/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import DrawableContainer2 from 'entity/DrawableContainer2';

export default class BatchableContainer2 extends DrawableContainer2 {
  isBatchParent = false;

  constructor(x: number, y: number) {
    super(x, y);
  }
}
