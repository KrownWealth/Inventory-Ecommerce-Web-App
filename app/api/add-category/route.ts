import { NextResponse } from 'next/server';
import { db } from '@/lib';

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    
    if (!name) {
      throw new Error('Category name is required');
    }

    const newCategory = await db.category.create({
      data: { name },
    }); 
    
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error: any) {
    console.error("Error creating category:", error); 
    return NextResponse.json({ error: `Category creation failed: ${error.message}` }, { status: 400 });
  }
}
