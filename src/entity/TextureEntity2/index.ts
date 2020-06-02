/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { BatchableContainer2 } from 'entity';
import { BasicTexture2 } from 'texture';
import { Shape2 } from 'geometry/Shape2';
import { AABB2 } from 'geometry';
import { Matrix2 } from 'math';
import Vector2, { Point2 } from 'math/Vector2';
import { ApplyMatrix } from 'utility/functions';
import { DEFAULT } from 'utility/gco';
import Color from 'utility/Color';

export default class TextureEntity2 extends BatchableContainer2 {
  texture: BasicTexture2;
  textureTransformation: Matrix2 = new Matrix2();
  textureTranslation: Matrix2 = new Matrix2();
  shape: Shape2 = new AABB2(AABB2.EMPTY);
  originalShape: Shape2 = new AABB2(AABB2.EMPTY);
  clip: AABB2 = new AABB2(AABB2.EMPTY);
  tint: Color = new Color(1, 1, 1, 1);

  private static PS_TP = Vector2.FromPool(0, 0);

  constructor(x: number, y: number, texture: BasicTexture2) {
    super(x, y);
    this.texture = texture;
    this.SetTexture(texture);
  }

  Render(ctx: CanvasRenderingContext2D): this {
    if (this.render === true) {
      this.ProcessTransform(this.parent);

      if (this.display === true) {
        const { texture, clip, textureTranslation, transform } = this;

        ApplyMatrix(ctx, transform.global);

        ctx.globalAlpha = this.tint.a;
        ctx.globalCompositeOperation = DEFAULT;
        ctx.drawImage(
          texture.image,
          clip.topLeftX,
          clip.topLeftY,
          clip.bottomRightX,
          clip.bottomRightY,
          textureTranslation.e,
          textureTranslation.f,
          this._width,
          this._height
        );
      }

      return this.RenderChildren(ctx);
    }

    return this;
  }

  ClipReconfigure(
    x: number,
    y: number,
    width: number,
    height: number,
    offsetX: number,
    offsetY: number,
    originWidth: number,
    originHeight: number
  ): this {
    const { texture, anchor, clip, textureTransformation, textureTranslation } = this;
    const scaleX = width / texture.fullWidth;
    const scaleY = height / texture.fullHeight;
    const prevWidth = this.width;
    const prevHeight = this.height;

    clip.SetAsRectangle({ x, y, width, height });
    this.SetSourceSize(width, height);

    if (prevWidth !== 0 && prevHeight !== 0) {
      this.width = prevWidth;
      this.height = prevHeight;
    }

    textureTransformation.SetTransform(
      (scaleX * clip.topLeftX) / width,
      (scaleY * clip.topLeftY) / height,
      scaleX,
      scaleY
    );

    textureTranslation.SetTransform(
      -originWidth * anchor.x + offsetX,
      -originHeight * anchor.y + offsetY,
      scaleX,
      scaleY
    );

    return this;
  }

  SetTexture(texture: BasicTexture2): this {
    this.texture = texture;
    this.ClipReconfigure(0, 0, texture.width, texture.height, 0, 0, texture.width, texture.height);
    this.shape = new AABB2(this.clip);
    this.originalShape = new AABB2(this.clip);

    return this;
  }

  UpdateTextureTransform(): this {
    const { textureTranslation, textureTransformation, _width, _height, anchor, texture, clip } = this;

    textureTranslation.TranslateTo(-_width * anchor.x, -_height * anchor.y);
    textureTransformation.TranslateTo(
      ((_width / texture.fullWidth) * clip.topLeftX) / _width,
      ((_height / texture.fullHeight) * clip.topLeftY) / _height
    );

    return this;
  }

  UpdateShape(newShape?: Shape2): this {
    if (newShape != null) {
      this.originalShape = newShape.Copy();
      this.shape = newShape;
    } else {
      this.shape.SetWith(this.originalShape);
    }

    this.shape.Scale(this.scale.x, this.scale.y);

    return this;
  }

  IntersectsPoint2(p: Point2): boolean {
    if (this.interactive === false) return false;
    const tp = TextureEntity2.PS_TP;

    tp.SetV(p);
    tp.SubtractV(this.position);
    tp.Add(this.width * this.anchor.x, this.height * this.anchor.y);

    return this.shape.IntersectsPoint2(tp);
  }
}
