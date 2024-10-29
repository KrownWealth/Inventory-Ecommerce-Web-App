import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';
import { z } from 'zod';
import {
  db,
  ProductNameSchema,
  CostPriceSchema,
  StockSchema,
  DescriptionSchema,
  CategorySchema,
  StatusSchema,
} from '@/lib'; 

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});


const ProductSchema = z.object({
  name: ProductNameSchema,
  description: DescriptionSchema,
  costPrice: CostPriceSchema,
  sellingPrice: z.number().positive({
    message: "Selling price must be a positive number.",
  }), 
  stock: StockSchema,
  category: CategorySchema,
  status: StatusSchema,
  image: z.string().url({
    message: "Invalid image URL.",
  }), 
  slug: z.string({
    message: "Slug cannot be empty.",
  }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedBody = ProductSchema.parse(body);
    const { name, description, costPrice, sellingPrice, stock, category, status, image, slug } = parsedBody;

    if (!name || !description || !costPrice || !sellingPrice || !stock || !category || !status || !image || !slug) {
      return new NextResponse('Missing Fields', { status: 400 });
    }
    const uploadResponse = await cloudinary.v2.uploader.upload(image, {
      folder: 'products',
    });

    const newProduct = await db.product.create({
      data: {
        name,
        description,
        costPrice,
        sellingPrice,
        slug,
        stock,
        category: {
          connect: { id: category }, 
        },
        status,
        image: uploadResponse.secure_url, 
      },
    });

    console.log('New Product', newProduct);
    return NextResponse.json(newProduct, { status: 201 });

  } catch (error: any) {
    console.error('Server error', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    if (error.name === 'PrismaClientKnownRequestError') {
      console.log('Prisma Error: ', error.message);
      return NextResponse.json({ error: `Prisma Error: ${error.message}` }, { status: 400 });
    } else if (error.name === 'CloudinaryError') {
      console.log('Cloudinary Error: ', error.message);
      return NextResponse.json({ error: `Cloudinary Error: ${error.message}` }, { status: 400 });
    } else {
      console.log('General Error: ', error.message);
      return NextResponse.json({ error: `Product creation failed: ${error.message}` }, { status: 400 });
    }
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    const updatedProduct = await db.product.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "An error occurred while updating the product." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
     const body = await req.json();
    const { id } = body;

    await db.product.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Product deleted successfully' }, {status: 200});
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "An error occurred while updating the product." }, { status: 500 });
  }
}




// Get product by slug
