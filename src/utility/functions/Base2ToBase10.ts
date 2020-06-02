/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export default function Base2ToBase10(value: string | number): number {
  return parseInt(`${value}`, 2);
}
