import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { Skill } from '@/types/employee.type';
import { constructEmployeeId } from '@/utils';

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const employees = await prisma.employee.findMany({
        include: {
          skills: true,
        },
      });
      res.status(200).json(employees);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching employees' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }

  if (req.method === 'POST') {
    try {
      const { skills } = req.body;

      const employee = await prisma.employee.create({
        data: {
          ...req.body,
          id: constructEmployeeId(),
          skills: {
            create: skills.map((skill: Skill) => ({
              ...skill,
            })),
          },
        },
      });

      res.status(201).json(employee);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating employee with skills' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
