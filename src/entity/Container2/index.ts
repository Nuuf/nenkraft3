/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import Core2 from 'entity/Core2';
import { FickleDelete } from 'utility/Functions';

// const { abs: Abs, min: Min, max: Max } = Math;

export default class Container2 extends Core2 {
  parent: Container2 | undefined;
  children: Array<Container2> = [];

  constructor(x: number, y: number) {
    super(x, y);
  }

  Render(): this {
    if (this.render === true) {
      this.ProcessTransform(this.parent);
      if (this.children.length > 0) return this.RenderChildren();
    }

    return this;
  }

  RenderChildren(): this {
    const { children } = this;

    for (var i = 0; i < children.length; ++i) {
      children[i].Render();
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

  AddChildren(): this {
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
}
