import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true, 
      },
    });

    const totalProducts = await prisma.product.count();
    return NextResponse.json({
      products,
      totalProducts,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products." }, { status: 400 });
  }
}
