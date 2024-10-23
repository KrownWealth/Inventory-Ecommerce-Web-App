import { NextResponse } from 'next/server';
import { db } from '@/lib';


export async function GET(req: any) {
  const { searchParams } = new URL(req.url);
  const pageParam = searchParams.get('page');
  const page = pageParam ? parseInt(pageParam) : 1; 
  const itemsPerPage = 10;

  try {
    const products = await db.product.findMany({
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
      include: { category: true },
    });

    const totalProducts = await db.product.count();

    return NextResponse.json({
      products,
      totalPages: Math.ceil(totalProducts / itemsPerPage),
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products.' }, { status: 400 });
  }
}
