import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.usersCreateInput[] = [
  {
    name: 'User 1',
    email: 'user1@email.com',
    password: 'user1',
  },
  {
    name: 'User 2',
    email: 'user2@email.com',
    password: 'user2',
  },
  {
    name: 'User 3',
    email: 'user3@email.com',
    password: 'user3',
  },
]

const groupsData: Prisma.groupsCreateInput[] = [
  {
    name: 'Group 1',
    users: [],
  },
  {
    name: 'Group 2',
    users: [],
  },
  {
    name: 'Group 3',
    users: [],
  },
]

async function main() {
  console.log(`Start seeding ...`)

  for (const u of userData) {
    const user = await prisma.users.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}, name: ${user.name}`)
  }

  for (const g of groupsData) {
    const group = await prisma.groups.create({
      data: g,
    })

    console.log(`Created group with id: ${group.id}, name: ${group.name}`)
  }

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)

    await prisma.$disconnect()

    process.exit(1)
  })
