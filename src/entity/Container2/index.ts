/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import Core2 from 'entity/Core2';
import FickleDelete from 'utility/Functions/FickleDelete';

// const { abs: Abs, min: Min, max: Max } = Math;

export default class Container2 extends Core2 {
  parent: Container2 | undefined;
  children: Array<Container2> = [];
  renderChildren = true;

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

  AddChild<T extends Container2>(child: T): T {
    const { parent } = child;

    if (parent != null) parent.RemoveChild(child);
    child.parent = this;
    this.children.push(child);

    return child;
  }

  AddChildren<T extends Container2>(...children: Array<T>): this {
    for (var i = 0; i < children.length; ++i) {
      this.AddChild(children[i]);
    }

    return this;
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

  /* SwapWith<T extends Container2>(child: T): this {
    if (this.parent && this.parent === child.parent) {
      const pChildren = this.parent.children;
      const aIndex = pChildren.indexOf(this);
      const bIndex = pChildren.indexOf(child);
      if (aIndex !== -1 && bIndex !== -1) {

      }
    }
    return this;
  } */
}
