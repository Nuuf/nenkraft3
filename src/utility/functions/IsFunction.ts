/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export default function IsFunction(value: any): boolean {
  return Object.prototype.toString.call(value) === '[object Function]';
}
