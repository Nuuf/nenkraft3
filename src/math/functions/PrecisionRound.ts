/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

const { pow: Pow, round: Round } = Math;

export default function (value: number, precision?: number): number {
  if (precision == null) return value;
  const divisor = Pow(10, precision);

  return Round(divisor * value) / divisor;
}
