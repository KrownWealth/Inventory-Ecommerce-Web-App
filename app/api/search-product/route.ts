
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query, page } = req.query;
  const currentPage = Number(page) || 1;
  const productsPerPage = 20; 

  try {
    const queryConditions = query ? { name: { contains: query } } : {};
    const where = query ? {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    } : {}; 

    const products = await prisma.product.findMany({
     where: queryConditions,
        skip: (currentPage - 1) * productsPerPage,
        take: productsPerPage,
    });

    const totalProducts = await prisma.product.count({ where });
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    res.status(200).json({ products, totalPages });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "An error occurred while fetching products." });
  }
}
