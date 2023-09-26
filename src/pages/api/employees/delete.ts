import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;

      await prisma.employee.delete({
        where: { id },
      });

      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error deleting employee' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
