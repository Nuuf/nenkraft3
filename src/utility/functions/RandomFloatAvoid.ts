/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import RandomFloat from './RandomFloat';
import ErrorMsgs from '../ErrorMsgs';

export default function RandomFloatAvoid(min: number, max: number, avoidMax: number, avoidMin: number): number {
  let value = RandomFloat(min, max);

  if (min > avoidMin || max < avoidMax) throw new Error(ErrorMsgs.AVOID_INFINITE_LOOPS);

  while (value > avoidMin && value < avoidMax) {
    value = RandomFloat(min, max);
  }

  return value;
}
