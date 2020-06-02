/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

const { random: Random } = Math;

export default function RandomInteger(min: number, max: number): number {
  return (Random() * (max - min + 1) + min) | 0;
}
