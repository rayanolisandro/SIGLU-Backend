// Error P2002: se intentó guardar un dato único que ya existe (ej: email repetido)
export function isPrismaUniqueConstraintError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'P2002'
  );
}

// Error P2003: falla una clave foránea. Pasa cuando se manda un id
// relacionado que no existe (ej: estadoId 99) o cuando se quiere borrar
// un registro que otra tabla está usando.
export function isPrismaForeignKeyError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'P2003'
  );
}
