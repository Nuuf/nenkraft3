/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Stage2 } from 'entity';
import { Graphic2 } from 'entity';
import { CirclePath } from 'paths';
import { Vector2 } from 'math';
import { RADIAN, PHI } from 'math/constants';
import { PGTools } from '../../..';

export default function (container: HTMLDivElement, tools: PGTools): void {
  const canvas = document.createElement('canvas');

  canvas.width = 1000;
  canvas.height = 1000;

  container.appendChild(canvas);

  const stage2 = new Stage2({ canvas });
  const ball = new Graphic2(500, 500, new CirclePath({ center: { x: 0, y: 0 }, radius: 20 }, {}));

  stage2.AddChild(ball);

  let rot = 0;
  const force = 5 * PHI;
  const speed = 2 * PHI;
  const velocity = new Vector2(1, 1);

  stage2.onProcess.Add(() => {
    ball.position.AddV(velocity);
    velocity.Set(Math.cos(rot) * force, Math.sin(rot) * force);
    rot += RADIAN * speed;
  });

  const killFPS = stage2.DisplayFPS();

  tools.onKill = (): void => {
    stage2.Destroy();
    killFPS();
    console.log('Killed stage');
  };
}
