
import { CartItems } from "@/components/custom-ui/reuseables";
import { CheckoutForm } from "@/views";
import { db } from "@/lib";
import Stripe from "stripe";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string);


const CheckoutPage = async ({ params }: { params: { productId: string } }) => {
  const product = await db.product.findUnique({
    where: { id: params.productId },
    include: {
      category: true,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  const amountInCents = product.sellingPrice ? product.sellingPrice * 100 : 0;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: "USD",
    metadata: { productId: product.id },
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

          <div className="w-1/2">
            <Card className="">
              <CardHeader>
                <CardTitle className='text-sm md:text-lg'>Checkout</CardTitle>
              </CardHeader>
              <CardContent>
                <CheckoutForm
                  product={product}
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
