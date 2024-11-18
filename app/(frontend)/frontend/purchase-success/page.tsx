import { GoBackBtn, ViewOrderBtn } from '@/components/custom-ui/reuseables';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { db } from '@/lib';
import { notFound } from 'next/navigation';
import { FaRegTimesCircle } from 'react-icons/fa';
import { FaRegCircleCheck } from "react-icons/fa6";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2024-09-30.acacia"
});

const PaymentSuccess = async ({ searchParams }: { searchParams: { payment_intent: string } }) => {
  // Retrieve the payment intent
  const paymentIntent = await stripe.paymentIntents.retrieve(searchParams.payment_intent);

  if (!paymentIntent.metadata.productId) {
    console.log('Missing productId in paymentIntent metadata:', paymentIntent.metadata);
    return notFound();
  };

  // Check if the order exists in the database
  const order = await db.product.findUnique({
    where: { id: paymentIntent.metadata.productId }
  });

  if (!order) return notFound();

  const isSuccess = paymentIntent.status === "succeeded";

  if (isSuccess) {
    try {
      // Create an order if it doesn't exist
      const existingOrder = await db.order.findUnique({
        where: { paymentIntentId: searchParams.payment_intent },
      });

      if (!existingOrder) {
        const cartItems = JSON.parse(paymentIntent.metadata.cartItems);

        // Create the order in the database
        await db.order.create({
          data: {
            userId: paymentIntent.metadata.userId,
            paymentIntentId: searchParams.payment_intent,
            paymentStatus: paymentIntent.status,
            totalPrice: paymentIntent.amount_received,
            status: 'PROCESSING',
            orderItems: {
              create: cartItems.map((item: { productId: string; quantity: number }) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        });

        // Clear the cart items
        await db.cartItem.deleteMany({
          where: { userId: paymentIntent.metadata.userId },
        });
      }
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  }

  return (
    <section className="w-full flex justify-center py-10">
      <Card className="max-w-lg w-full p-4 space-y-8">
        {isSuccess ? (
          <div className='flex flex-col items-center justify-center space-y-8'>
            <CardTitle className="text-xl md:text-4xl">Your Payment is Successful</CardTitle>
            <CardContent className="flex flex-col items-center justify-center">
              <FaRegCircleCheck className="w-24 h-24 text-green-700" />
              <h2 className="text-4xl md:text-6xl">Thank you!</h2>
              <ViewOrderBtn />
            </CardContent>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center space-y-8'>
            <CardTitle className="text-xl md:text-4xl">Payment Failed</CardTitle>
            <CardContent className="flex flex-col items-center justify-center">
              <FaRegTimesCircle className="w-24 h-24 text-red-700" />
              <GoBackBtn />
            </CardContent>
          </div>
        )}
      </Card>
    </section>
  );
};

export default PaymentSuccess;
