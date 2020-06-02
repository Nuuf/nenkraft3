/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export default function IsObject(value: any): boolean {
  return Object.prototype.toString.call(value) === '[object Object]';
}
