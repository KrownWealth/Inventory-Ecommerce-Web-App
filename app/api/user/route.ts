import { db } from "@/lib";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { FormSchema } from "@/lib";
import { ZodError } from "zod";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = FormSchema.parse(body);

    if(!email || !username || !password){
      return new NextResponse('Missing Fields', {status: 400})
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

