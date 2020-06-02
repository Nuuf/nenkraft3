/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export default function IsInteger(value: any): boolean {
  return Number(value) === value && value % 1 === 0;
}
