/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Pool } from 'utility';
import { Vector2 } from 'math';

export default function (container: HTMLDivElement): void {
  container.appendChild(document.createElement('canvas'));
  const pool = new Pool(() => new Vector2(0, 0));

  pool.Flood();
  console.log(pool);
}
