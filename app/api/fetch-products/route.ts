import { NextResponse } from 'next/server';
import { db } from '@/lib';


export async function GET() {
  try {
    const products = await db.product.findMany({
      include: {
        category: true, 
      },
    });

    const totalProducts = await db.product.count();
    return NextResponse.json({
      products,
      totalProducts,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products." }, { status: 400 });
  }
}
