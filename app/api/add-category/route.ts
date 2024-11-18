
import { NextResponse } from 'next/server';
import { db } from '@/lib';


export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    
    const newCategory = await db.category.create({
      data: { name },
    }); 
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error: any) {
    console.log("Error creating category:", error.message);
    return NextResponse.json({ error: `Category creation failed: ${error.message}` }, { status: 400 });
  }
}
