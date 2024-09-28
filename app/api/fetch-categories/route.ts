import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    const totalCategories = await prisma.category.count();
    return NextResponse.json({
      categories,
      totalCategories,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products." }, { status: 400 });
  }
}
