/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import Matrix2 from 'math/Matrix2';

export default function ApplyMatrix(
  ctx: {
    setTransform: (a: number, b: number, c: number, d: number, e: number, f: number) => any;
  },
  matrix: Matrix2
): void {
  ctx.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f);
}
