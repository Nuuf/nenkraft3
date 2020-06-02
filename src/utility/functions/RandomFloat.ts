/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

const { random: Random } = Math;

export default function RandomFloat(min: number, max: number): number {
  return Random() * (max - min) + min;
}
