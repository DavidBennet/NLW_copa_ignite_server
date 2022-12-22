import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'Bener',
            email: 'bener@example.com',
            avatarUrl: 'https://github.com/DavidBennet.png',
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'exemple pool',
            code: 'CAVALO',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id,
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            data: '2022-12-16T18:22:29.244Z',
            firstTeamCountryCode: 'US',
            secondTeamCountryCode: 'BR',
        }
    })

    await prisma.game.create({
        data: {
            data: '2022-12-16T00:00:00.255Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'CH',

            guesses: {
                create: {
                    firstTeamPoints: 4,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id,
                            }
                        }
                    }
                }
            }
        }
    })
}

main()