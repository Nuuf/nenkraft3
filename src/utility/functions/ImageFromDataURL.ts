/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export default function ImageFromDataURL(
  url: string,
  onLoad: ((this: GlobalEventHandlers, ev: Event) => any) | null,
  width?: number,
  height?: number
): HTMLImageElement {
  const image = new Image();

  if (width != null) image.width = width;
  if (height != null) image.height = height;
  image.onload = onLoad;
  image.src = url;

  return image;
}
