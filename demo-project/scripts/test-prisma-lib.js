const { prisma } = require('../lib/prisma');

async function main() {
    try {
        await prisma.$connect();
        console.log('Successfully connected to the database');
        await prisma.$disconnect();
    } catch (e) {
        console.error('Error connecting to database:', e);
        process.exit(1);
    }
}

main();
