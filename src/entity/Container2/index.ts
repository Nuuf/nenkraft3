/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import Core2 from 'entity/Core2';
import FickleDelete from 'utility/functions/FickleDelete';
import Vector2, { Point2 } from 'math/Vector2';
import AABB2 from 'geometry/AABB2';

const { abs: Abs, min: Min, max: Max } = Math;

export default class Container2 extends Core2 {
  parent: Container2 | undefined;
  children: Array<Container2> = [];
  renderChildren = true;

  private static PS_MIN_MAX: AABB2 = new AABB2({ topLeftX: 0, topLeftY: 0, bottomRightX: 0, bottomRightY: 0 });

  constructor(x: number, y: number) {
    super(x, y);
  }

  Render(ctx: any): this {
    if (this.render === true) {
      this.ProcessTransform(this.parent);

      return this.RenderChildren(ctx);
    }

    return this;
  }

  RenderChildren(ctx: any): this {
    const { children } = this;

    if (children.length > 0 && this.renderChildren === true) {
      for (var i = 0; i < children.length; ++i) {
        children[i].Render(ctx);
      }
    }

    return this;
  }

  AddChild<T extends Container2>(child: T, back?: boolean): T {
    const { parent } = child;

    if (parent != null) parent.RemoveChild(child);
    child.parent = this;
    if (back === true) this.children.unshift(child);
    else this.children.push(child);

    return child;
  }

  AddChildren<T extends Container2>(...children: Array<T>): this {
    for (var i = 0; i < children.length; ++i) {
      this.AddChild(children[i]);
    }

    return this;
  }

  Mount<T extends Container2>(...children: Array<T>): this {
    return this.AddChildren(...children);
  }

  AddSibling<T extends Container2>(sibling: T): T {
    const { parent } = this;

    if (parent != null) parent.AddChild(sibling);

    return sibling;
  }

  RemoveChild<T extends Container2>(child: T): T {
    const { children } = this;
    const index = children.indexOf(child);

    if (index !== -1) {
      child.parent = undefined;

      return FickleDelete(children, index) as T;
    }

    return child;
  }

  RemoveChildren<T extends Container2>(...children: Array<T>): Array<T> {
    const rChildren: Array<T> = [];
    let child: T | undefined;

    for (var i = 0; i < children.length; ++i) {
      child = this.RemoveChild(children[i]);
      if (child) rChildren.push(child);
    }

    return rChildren;
  }

  Unmount<T extends Container2>(...children: Array<T>): Array<T> {
    return this.RemoveChildren(...children);
  }

  SwapWithIndex(index: number): this {
    if (this.parent != null) {
      const { children } = this.parent;
      const tindex = children.indexOf(this);

      if (tindex !== -1) {
        if (index === -1) index = children.length - 1;
        const sibling = children[index];

        children[index] = this;
        children[tindex] = sibling;
      }
    }

    return this;
  }

  SwapWith<T extends Container2>(child: T): this {
    if (this.parent !== undefined && this.parent === child.parent) {
      const index = this.parent.children.indexOf(child);

      if (index !== undefined && index !== -1) this.SwapWithIndex(index);
    }

    return this;
  }

  SendToFront(): this {
    if (this.parent !== undefined) {
      this.parent.AddChild(this);
    }

    return this;
  }

  SendToBack(): this {
    if (this.parent !== undefined) {
      this.parent.AddChild(this, true);
    }

    return this;
  }

  Dump(): this {
    const { children } = this;

    for (var i = 0; i < children.length; ++i) {
      children[i].parent = undefined;
    }

    children.length = 0;

    return this;
  }

  Destroy(): this {
    this.Dump();
    if (this.parent !== undefined) this.parent.RemoveChild(this);

    return this;
  }

  AttachTo<T extends Container2>(parent: T): this {
    return parent.AddChild(this);
  }

  Detach(): this {
    if (this.parent !== undefined) return this.parent.RemoveChild(this);

    return this;
  }

  GetChildClosestTo<T extends Container2>(p: Point2, filter: (child: T) => boolean): T | null | undefined {
    const { children } = this;
    let [child] = children;
    let distance = Infinity;
    let tempDistance = 0;
    let closestChild;

    if (children.length !== 0) {
      for (var i = 1; i < children.length; child = children[++i]) {
        if (filter !== undefined) {
          if (filter(child as T) === false) continue;
        }

        tempDistance = Abs(Vector2.GetDistanceSquaredBetween(child.position, p));

        if (tempDistance < distance) {
          distance = tempDistance;
          closestChild = child;
        }
      }

      return closestChild as T;
    }

    return null;
  }

  GetChildFurthestFrom<T extends Container2>(p: Point2, filter: (child: T) => boolean): T | null | undefined {
    const { children } = this;
    let [child] = children;
    let distance = Infinity;
    let tempDistance = 0;
    let furthestChild;

    if (children.length !== 0) {
      for (var i = 1; i < children.length; child = children[++i]) {
        if (filter !== undefined) {
          if (filter(child as T) === false) continue;
        }

        tempDistance = Abs(Vector2.GetDistanceSquaredBetween(child.position, p));

        if (tempDistance > distance) {
          distance = tempDistance;
          furthestChild = child;
        }
      }

      return furthestChild as T;
    }

    return null;
  }

  ClusterBind(): this {
    const { children } = this;
    let [child] = children;
    let cBounds;
    const temp = Container2.PS_MIN_MAX;

    temp.UnsafeSet(0, 0, 0, 0);

    for (var i = 0; i < children.length; child = children[++i]) {
      cBounds = child.ComputeLocalBounds(child.anchor);

      temp.UnsafeSet(
        Min(temp.topLeftX, cBounds.topLeftX),
        Min(temp.topLeftY, cBounds.topLeftY),
        Max(temp.bottomRightX, cBounds.bottomRightX),
        Max(temp.bottomRightY, cBounds.bottomRightY)
      );
    }

    temp.Compute();

    this.SetSourceSize(temp.width, temp.height);

    this.bounds.ComputeLocal(temp.topLeftX, temp.topLeftY, this.width, this.height, undefined, this);

    return this;
  }
}
