import { NextResponse } from 'next/server';
import { db } from '@/lib';



export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params; 

  try {
    const product = await db.product.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });
    if (!product) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Failed to fetch product." }, { status: 500 });
  }
}
