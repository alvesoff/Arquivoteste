const { PrismaClient } = require('@prisma/client');

// Instância global do PrismaClient para evitar múltiplas conexões
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

module.exports = prisma;