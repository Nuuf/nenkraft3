/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export default function InverseClamp(value: number, min: number, max: number): number {
  if (value < min) return max;
  if (value > max) return min;

  return value;
}
