import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import cloudinary from 'cloudinary';

const prisma = new PrismaClient();

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const { name, description, price, stock, category, status, image } = await req.json();

    const uploadResponse = await cloudinary.v2.uploader.upload(image, {
      folder: 'products',
    });

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        category: {
          connect: { id: category }, 
        },
        status,
        image: uploadResponse.secure_url,
      },
    });
    console.log("New Product", newProduct);

    return NextResponse.json(newProduct, { status: 201 });
    
  } catch (error: any) {
    console.log("Error creating product:", error.message);
    return NextResponse.json({ error: `Product creation failed: ${error.message}` }, { status: 400 });
  }
}
