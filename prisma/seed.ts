
import { Employee } from "@/types/employee.type"
import prisma from "../src/lib/prisma"
import { mockEmployees } from "../src/utils/mockData"

async function main() {
    const seedingData: Employee[] = mockEmployees
    console.log('Start seeding ...')
    const employees = await prisma.employee.findMany()
    console.dir(employees, { depth: null })

    for (const emp of seedingData) {
      const employee = await prisma.employee.create({
        data: {
          ...emp,
          skills: {
            create: emp.skills.map((skill) => ({
              ...skill,
            })),
          },
        },
      })
      console.log(`Created user with id: ${employee.id}`)
    }

    console.log('Seeding finished.')
  }
  
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })