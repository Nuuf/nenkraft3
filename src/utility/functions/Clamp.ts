/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export default function Clamp(value: number, min: number, max: number): number {
  if (value < min) return min;
  if (value > max) return max;

  return value;
}
