const { PrismaClient } = require('@prisma/client');

async function main() {
    const prisma = new PrismaClient();
    try {
        await prisma.$executeRawUnsafe(`UPDATE atividade SET tipo = descricao WHERE descricao IS NOT NULL;`);
        await prisma.$executeRawUnsafe(`UPDATE atividade SET descricao = NULL WHERE tipo IS NOT NULL;`);
        console.log("Data migration completed successfully.");
    } catch (error) {
        console.error("Error migrating data:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
