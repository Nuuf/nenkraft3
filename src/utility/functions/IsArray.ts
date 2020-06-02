/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export default function IsArray(value: any): boolean {
  return Object.prototype.toString.call(value) === '[object Array]';
}
