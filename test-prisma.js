
const { PrismaClient } = require('@prisma/client');

async function main() {
    const prisma = new PrismaClient();
    try {
        console.log('Checking Prisma Client...');
        if (prisma.data_atividade_participante) {
            console.log('data_atividade_participante model exists.');
            const count = await prisma.data_atividade_participante.count();
            console.log('Count:', count);
        } else {
            console.error('data_atividade_participante model is UNDEFINED!');
            console.log('Available models:', Object.keys(prisma).filter(k => !k.startsWith('_')));
        }
    } catch (e) {
        console.error('Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
