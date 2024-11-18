import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const paymentIntentId = searchParams.get('payment_intent');

  if (!paymentIntentId) {
    return NextResponse.json({ message: 'Missing payment intent ID' }, { status: 400 });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Check if the order already exists in the database to prevent duplicates
      const existingOrder = await db.order.findUnique({
        where: { paymentIntentId },
      });

      if (!existingOrder) {
        // Assuming metadata contains userId and cart items info as JSON string (e.g., [{ productId: '123', quantity: 2 }, ...])
        const cartItems = JSON.parse(paymentIntent.metadata.cartItems);

        // Create the order in the database
        const newOrder = await db.order.create({
          data: {
            userId: paymentIntent.metadata.userId,
            paymentIntentId,
            paymentStatus: paymentIntent.status,
            totalPrice: paymentIntent.amount_received / 100, 
            status: 'PROCESSING',
            orderItems: {
              create: cartItems.map((item: { productId: string; quantity: number }) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        });

        
        await db.cartItem.deleteMany({
          where: { userId: paymentIntent.metadata.userId },
        });

        return NextResponse.json({ message: 'Order created successfully', order: newOrder });
      } else {
        return NextResponse.json({ message: 'Order already exists' });
      }
    } else {
      return NextResponse.json({ message: 'Payment not successful' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error handling payment success:', error);
    return NextResponse.json({ message: 'Failed to process payment' }, { status: 500 });
  }
}
