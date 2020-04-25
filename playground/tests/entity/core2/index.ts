/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Core2 } from 'entity';

export default function (container: HTMLDivElement): void {
  container.appendChild(document.createElement('canvas'));
  const core2 = new Core2(0, 0);

  console.log(core2);
}
