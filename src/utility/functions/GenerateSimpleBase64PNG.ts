/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

const { ceil: Ceil } = Math;

export default function GenerateSimpleBase64PNG(
  renderFunction: () => { Render: (ctx: CanvasRenderingContext2D) => any; width: number; height: number },
  backgroundColor = '',
  forceWidth?: number,
  forceHeight?: number
): string {
  const drawable = renderFunction();
  const canvas = document.createElement('canvas', { is: 'canvas' });

  canvas.width = forceWidth != null ? forceWidth : Ceil(drawable.width);
  canvas.height = forceHeight != null ? forceHeight : Ceil(drawable.height);

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawable.Render(ctx);

  return canvas.toDataURL('image/png');
}
