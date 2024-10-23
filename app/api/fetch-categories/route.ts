import { NextResponse } from 'next/server';
import { db } from '@/lib';


export async function GET() {
  try {
    const categories = await db.category.findMany();
    const totalCategories = await db.category.count();
    return NextResponse.json({
      categories,
      totalCategories,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products." }, { status: 400 });
  }
}
