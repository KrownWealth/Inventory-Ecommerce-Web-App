import { NextResponse } from 'next/server';
import {db } from "@/lib"



export async function GET(request: Request) {
  const url = new URL(request.url);
  const productId = url.searchParams.get("productId");

  try {
    if (productId) {
      // Fetch a specific product by productId
      const product = await db.product.findUnique({
        where: { id: productId },
        include: { category: true },
      });
      
      if (!product) {
        return NextResponse.json({ error: "Product not found." }, { status: 404 });
      }

      return NextResponse.json(product);
    } else {
      // Fetch all products
      const products = await db.product.findMany({
        include: { category: true },
      });
      const totalProducts = await db.product.count();

      return NextResponse.json({ products, totalProducts });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products." }, { status: 400 });
  }
}
