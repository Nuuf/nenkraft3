/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import RandomInteger from './RandomInteger';
import ErrorMsgs from '../ErrorMsgs';

export default function RandomIntegerAvoid(min: number, max: number, avoidMax: number, avoidMin: number): number {
  let value = RandomInteger(min, max);

  if (min > avoidMin || max < avoidMax) throw new Error(ErrorMsgs.AVOID_INFINITE_LOOPS);

  while (value > avoidMin && value < avoidMax) {
    value = RandomInteger(min, max);
  }

  return value;
}
