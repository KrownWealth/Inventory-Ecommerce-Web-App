
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    
    const newCategory = await prisma.category.create({
      data: { name },
    });

    console.log("New Category Created:", newCategory);
    
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error: any) {
    console.log("Error creating category:", error.message);
    return NextResponse.json({ error: `Category creation failed: ${error.message}` }, { status: 400 });
  }
}
