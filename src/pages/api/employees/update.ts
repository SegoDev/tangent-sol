import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { Skill } from '@/types/employee.type';

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    try {
      const { id, skills, ...employeeData } = req.body;

      const existingEmployee = await prisma.employee.findUnique({
        where: { id },
      });

      if (!existingEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      // Use a transaction for multiple database operations
      const updatedEmployee = await prisma.$transaction(async (prisma) => {
        const updatedEmployee = await prisma.employee.update({
          where: { id },
          data: employeeData,
        });

        // Update skills for the employee
        if (skills && skills.length > 0) {
          await prisma.skill.deleteMany({
            where: {
              employeeId: id,
            },
          });

          await prisma.skill.createMany({
            data: skills.map((skill: Skill) => ({
              ...skill,
              employeeId: id,
            })),
          });
        }

        return updatedEmployee;
      });

      res.status(200).json(updatedEmployee);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating employee' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
