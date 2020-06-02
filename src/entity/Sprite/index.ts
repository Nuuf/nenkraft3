/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import TextureEntity2 from 'entity/TextureEntity2';
import { BasicTexture2 } from 'texture';

export default class Sprite extends TextureEntity2 {
  constructor(x: number, y: number, texture: BasicTexture2) {
    super(x, y, texture);
  }
}
