/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import PopDelete from './PopDelete';
import ShiftDelete from './ShiftDelete';

export default function FickleDelete<T>(array: Array<T>, index: number): T | void {
  if (index > array.length * 0.5) return PopDelete(array, index);

  return ShiftDelete(array, index);
}
