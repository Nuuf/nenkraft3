/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export default function Base16ToBase10(value: string | number): number {
  return parseInt(`${value}`, 16);
}
