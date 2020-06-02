/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export default class BasicTexture2 {
  image: HTMLImageElement;
  id: string;
  width: number;
  height: number;
  fullWidth: number;
  fullHeight: number;
  uniformId = 0;

  constructor(
    image: HTMLImageElement,
    id?: string,
    width?: number,
    height?: number,
    fullWidth?: number,
    fullHeight?: number
  ) {
    this.image = image;
    this.id = id ? id : image.id;
    this.width = width ? width : image.naturalWidth;
    this.height = height ? height : image.naturalHeight;
    this.fullWidth = fullWidth ? fullWidth : this.width;
    this.fullHeight = fullHeight ? fullHeight : this.height;
  }
}
