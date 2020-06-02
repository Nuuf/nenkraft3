/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export default function IsFloat(value: any): boolean {
  return Number(value) === value && value % 1 !== 0;
}
