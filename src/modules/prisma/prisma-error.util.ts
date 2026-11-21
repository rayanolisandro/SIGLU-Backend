// Error P2002: se intentó guardar un dato único que ya existe (ej: email repetido)
export function isPrismaUniqueConstraintError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'P2002'
  );
}
