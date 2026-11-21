-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "apellido" VARCHAR(50) NOT NULL,
    "cuil" CHAR(11) NOT NULL,
    "legajo" VARCHAR(20) NOT NULL,
    "area" VARCHAR(40) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "rol" VARCHAR(20) NOT NULL DEFAULT 'inspector',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unidad" (
    "id" SERIAL NOT NULL,
    "interno" INTEGER NOT NULL,
    "marca" VARCHAR(40) NOT NULL,
    "modelo" VARCHAR(40) NOT NULL,
    "dominio" VARCHAR(10) NOT NULL,
    "tipo" VARCHAR(20) NOT NULL,
    "estado" VARCHAR(20) NOT NULL DEFAULT 'Operativa',
    "kilometraje" INTEGER NOT NULL DEFAULT 0,
    "proximoServiceKm" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Unidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Imbornal" (
    "id" SERIAL NOT NULL,
    "ubicacion" VARCHAR(160) NOT NULL,
    "tipo" VARCHAR(20) NOT NULL,
    "limpieza" VARCHAR(20) NOT NULL DEFAULT 'Sin revisar',
    "estructura" VARCHAR(20) NOT NULL DEFAULT 'Sin revisar',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Imbornal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solicitud" (
    "id" SERIAL NOT NULL,
    "tipo" VARCHAR(20) NOT NULL,
    "ubicacion" VARCHAR(160) NOT NULL,
    "descripcion" VARCHAR(1000) NOT NULL,
    "prioridad" VARCHAR(10) NOT NULL,
    "telefonoContacto" VARCHAR(30),
    "estado" VARCHAR(20) NOT NULL DEFAULT 'Pendiente',
    "fecha" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imbornalId" INTEGER,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Solicitud_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inspeccion" (
    "id" SERIAL NOT NULL,
    "numeroActa" VARCHAR(30) NOT NULL,
    "fecha" DATE NOT NULL,
    "norma" VARCHAR(100) NOT NULL,
    "articulo" VARCHAR(50) NOT NULL,
    "observaciones" TEXT NOT NULL,
    "documento" VARCHAR(100),
    "estado" VARCHAR(30) NOT NULL DEFAULT 'Registrada',
    "solicitudId" INTEGER NOT NULL,
    "inspectorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inspeccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Desagote" (
    "id" SERIAL NOT NULL,
    "fecha" DATE NOT NULL,
    "horaInicio" VARCHAR(8) NOT NULL,
    "horaFin" VARCHAR(8) NOT NULL,
    "estado" VARCHAR(20) NOT NULL DEFAULT 'Programado',
    "solicitudId" INTEGER NOT NULL,
    "unidadId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Desagote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cuil_key" ON "User"("cuil");

-- CreateIndex
CREATE UNIQUE INDEX "User_legajo_key" ON "User"("legajo");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Unidad_interno_key" ON "Unidad"("interno");

-- CreateIndex
CREATE UNIQUE INDEX "Unidad_dominio_key" ON "Unidad"("dominio");

-- CreateIndex
CREATE UNIQUE INDEX "Inspeccion_numeroActa_key" ON "Inspeccion"("numeroActa");

-- AddForeignKey
ALTER TABLE "Solicitud" ADD CONSTRAINT "Solicitud_imbornalId_fkey" FOREIGN KEY ("imbornalId") REFERENCES "Imbornal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitud" ADD CONSTRAINT "Solicitud_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inspeccion" ADD CONSTRAINT "Inspeccion_solicitudId_fkey" FOREIGN KEY ("solicitudId") REFERENCES "Solicitud"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inspeccion" ADD CONSTRAINT "Inspeccion_inspectorId_fkey" FOREIGN KEY ("inspectorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Desagote" ADD CONSTRAINT "Desagote_solicitudId_fkey" FOREIGN KEY ("solicitudId") REFERENCES "Solicitud"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Desagote" ADD CONSTRAINT "Desagote_unidadId_fkey" FOREIGN KEY ("unidadId") REFERENCES "Unidad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
