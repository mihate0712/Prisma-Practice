import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const shirakami = await prisma.user.upsert({
        where: { email: 'shirakami.fubuki@holo.live.jp' },
        update: {},
        create: {
            email: 'shirakami.fubuki@holo.live.jp',
            name: 'Shirakami Fubuki',
        },
    });

    console.log({ shirakami });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
