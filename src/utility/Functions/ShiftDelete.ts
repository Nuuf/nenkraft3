/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export default function ShiftDelete<T>(array: Array<T>, index: number): T | void {
  if (array.length < 1) return;
  const returnee = array[index];

  while (index > 0) {
    array[index] = array[index - 1];
    index--;
  }

  array.shift();

  return returnee;
}
