/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function AssignIfUndefined(a: Record<string, any>, b: Record<string, any>): void {
  for (const key in a) {
    if (a.hasOwnProperty(key) && b[key] === undefined) {
      b[key] = a[key];
    }
  }
}
