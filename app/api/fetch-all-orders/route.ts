import { NextResponse } from 'next/server';
import { db } from '@/lib';

export async function GET() {
  try {
    const orders = await db.order.findMany({
      include: {
        user: {
          select: { username: true },
        },
        orderItems: {
          include: {
            product: { select: { name: true } },
          },
        },
      },
    });
    const totalOrders = await db.order.count();

    const formattedOrders = orders.map(order => ({
      id: order.id,
      customerName: order.user?.username || "Unknown Customer",
      productName: order.orderItems.map(item => item.product.name).join(", "),
      orderDate: order.orderDate,
      paymentStatus: order.paymentStatus,
        //const totalSpent = user.orders.reduce((sum, order) => sum + (order.totalPrice ?? 0) / 100, 0);
      totalPrice: ((order.totalPrice ?? 0) / 100),
    }));

    return NextResponse.json({
      orders: formattedOrders,
      totalOrders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders." }, { status: 400 });
  }
}
