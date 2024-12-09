
import { NextResponse } from "next/server";
import { db } from '@/lib';

export async function DELETE(req: Request) {
  try {
    const { id }= await req.json();

    if (id) {
      await db.category.delete({
        where: {
          id: String(id),
        },
      });
      return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
    }

  } catch (error) {
    console.error("Error deleting category", error);
    return NextResponse.json({ error: "Failed to delete category." }, { status: 500 });
  }
}
