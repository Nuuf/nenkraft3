/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export function AssignIfUndefined(a: Record<string, any>, b: Record<string, any>): void {
  for (var key in a) {
    if (a.hasOwnProperty(key) && b[key] === undefined) {
      b[key] = a[key];
    }
  }
}
