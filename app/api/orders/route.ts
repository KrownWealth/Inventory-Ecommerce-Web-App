import { NextResponse } from "next/server";
import { db } from "@/lib";


export async function GET(req: Request) {
  const userId = req.headers.get("user-id");
  if (!userId) {
    console.error("Invalid or missing user ID:", userId);
    return NextResponse.json({ error: "No order for this user" }, { status: 400 });
  }

  try {
    const userOrderHistory = await db.order.findMany({
      where: { userId: userId },
      select: { id: true },
    });

    return userOrderHistory.length > 0
      ? NextResponse.json(userOrderHistory, { status: 200 })
      : NextResponse.json({ message: "No order for this user" }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user order:", error);
    return NextResponse.json({ error: "Failed to user order." }, { status: 500 });
  }
}
