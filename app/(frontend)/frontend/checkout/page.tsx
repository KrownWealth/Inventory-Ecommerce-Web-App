import { CartItems } from "@/components/custom-ui/reuseables";
import { CheckoutForm } from "@/views";
import Stripe from "stripe";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { getCartItemsForUser } from "@/services";
import { getServerSession } from "next-auth";
import { CartItemType } from "@/types";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string);


const CheckoutPage = async () => {
  const session = await getServerSession();
  if (!session || !session.user) {
    throw new Error("User is not authenticated");
  }
  const userId = parseInt(session.user.id, 10);
  const cartItems: CartItemType[] = await getCartItemsForUser(userId);

  const amountInCents = Math.max(
    50, // stripe charge of 50 cents
    cartItems.reduce((total: number, item: CartItemType) => {
      return total + item.price * item.quantity * 100;
    }, 0)
  );


  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: "USD",
    metadata: { userId: userId },
  });

  if (!paymentIntent.client_secret) {
    throw new Error("Stripe failed to create payment intent");
  }

  return (
    <section className="w-full">
      <div className="max-w-7xl py-10 px-8 md:px-12 mx-auto ">
        <h2 className='text-sm md:text-lg py-4 font-semibold'>All your orders in one place</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <CartItems />
          </div>
          <div className="w-full md:w-1/2">
            <Card className="">
              <CardHeader>
                <CardTitle className='text-sm md:text-lg'>Checkout</CardTitle>
              </CardHeader>
              <CardContent>
                <CheckoutForm
                  clientSecret={paymentIntent.client_secret}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
