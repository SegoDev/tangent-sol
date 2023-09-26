import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q } = req.query;

  try {
    const employees = await prisma.employee.findMany({
      where: {
        OR: [
          { firstName: { contains: q as string, mode: "insensitive" } },
          { lastName: { contains: q as string, mode: "insensitive" } },
          { email: { contains: q as string, mode: "insensitive" } },
        ],
      },
      include: {
        skills: true,
      },
    });

    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
