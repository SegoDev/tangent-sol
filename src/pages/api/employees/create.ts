import { NextApiRequest, NextApiResponse } from 'next';
import { Skill } from '@/types/employee.type';
import prisma from '@/lib/prisma';
import { constructEmployeeId } from '@/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { id, skills, ...employeeData } = req.body;

      const employee = await prisma.employee.create({
        data: {
          ...employeeData,
          id: id || constructEmployeeId(),
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
