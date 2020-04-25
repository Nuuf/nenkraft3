/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import Container2 from 'entity/Container2';

export default class DrawableContainer2 extends Container2 {
  interactive = true;
  display = true;

  constructor(x: number, y: number) {
    super(x, y);
  }
}
