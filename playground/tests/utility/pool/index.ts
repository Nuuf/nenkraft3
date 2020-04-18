import Pool from 'utility/Pool';
import Vector2 from 'math/Vector2';

export default function (container: HTMLDivElement): void {
  container.appendChild(document.createElement('canvas'));
  const pool = new Pool(() => new Vector2(0, 0));
  pool.Flood();
  console.log(pool);
}
