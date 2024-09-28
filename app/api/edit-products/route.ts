import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "An error occurred while updating the product." }, { status: 500 });
  }
}
