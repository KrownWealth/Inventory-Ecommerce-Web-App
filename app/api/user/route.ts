import { db } from "@/lib";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { FormSchema } from "@/lib";
import { ZodError } from "zod";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = FormSchema.parse(body);

    if (!email || !username || !password) {
      return new NextResponse('Missing Fields', { status: 400 })
    }

    const existingUserByEmail = await db.user.findUnique({
      where: { email: email }
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409 }
      );
    }

    const existingUserByUsername = await db.user.findUnique({
      where: { username: username }
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: "User with this username already exists" },
        { status: 409 }
      );
    }



    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    });
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Validation error", errors: error.errors },
        { status: 400 }
      );
    } else if (error.code === 'P2002') {
      return NextResponse.json(
        { message: "Database error: unique constraint violated" },
        { status: 409 }
      );
    } else {
      return NextResponse.json(
        { message: error.message || "Something went wrong!" },
        { status: 500 }
      );
    }
  }
}


export async function GET(req: NextRequest) {
  try {
    const dailyCount = await db.user.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 1)),
        },
      },
    });

    const monthlyCount = await db.user.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      },
    });

    const yearlyCount = await db.user.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        },
      },
    });

    // Parse query parameters from the request URL
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    const offset = (page - 1) * limit;

    const users = await db.user.findMany({
      where: { role: { not: 'ADMIN' } },
      skip: offset,
      take: limit,
      select: {
        id: true,
        username: true,
        email: true,
        orders: {
          select: {
            id: true,
            totalPrice: true,
          },
        },
      },
    });

    const customers = users.map((user) => {
      const totalOrders = user.orders.length;
      const totalSpent = user.orders.reduce((sum, order) => sum + (order.totalPrice ?? 0) / 100, 0); 
      return {
        id: user.id,
        name: user.username,
        email: user.email,
        totalOrders,
        totalSpent,
      };
    });

    const totalCustomers = await db.user.count({ where: { role: { not: 'ADMIN' } } });
    const totalPages = Math.ceil(totalCustomers / limit);
   
    return NextResponse.json({ 
      daily: dailyCount,
      monthly: monthlyCount,
      yearly: yearlyCount,
      customers,
      totalCustomers,
      totalPages,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}



export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updateUser } = body;

    const updatedUser = await db.user.update({
      where: { id },
      data: updateUser,
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "An error occurred while updating the product." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    await db.user.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "An error occurred while updating the product." }, { status: 500 });
  }
}
