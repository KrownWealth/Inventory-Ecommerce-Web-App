import { CheckoutForm, CartItems } from "@/views";
import { getCartItemsForUser } from "@/services";
import { getServerSession } from "next-auth";
import { CartItemType } from "@/types";
import { authOptions } from "@/lib/authOptions";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2024-09-30.acacia"
});

const CheckoutPage = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (!userId) {
    return <div className="items-center justify-center">User is not authenticated</div>;
  }

  const cartItems: CartItemType[] = await getCartItemsForUser(userId);
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.product?.sellingPrice ?? 0) * item.quantity;
  }, 0);


  const amountInCents = Math.round(totalPrice * 100);
  console.log("Amount in cent", amountInCents)
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: "USD",
    metadata: {
      userId: userId,
      productId: cartItems?.length > 0 ? cartItems[0].product?.id || '' : '',
      cartItems: JSON.stringify(cartItems.map(item => ({
        productId: item.product?.id || '',
        quantity: item.quantity
      }))),
    },
    automatic_payment_methods: { enabled: true },
  });


  if (!paymentIntent.client_secret) {
    throw new Error("Stripe failed to create payment intent");
  }

  return (
    <section className="w-full">
      <div className="max-w-7xl py-10 px-8 md:px-12 mx-auto ">
        <div>
          <h2 className='text-lg md:text-2xl pt-4 pb-8 font-semibold'>All your orders in one place</h2>
          <div className="grid grid-rows-2 md:grid-rows-2 lg:grid-cols-2 w-full gap-12">
            <div className="grid">
              <CartItems />
            </div>
            <div className="grid">
              <CheckoutForm
                clientSecret={paymentIntent.client_secret}
                priceInCent={amountInCents}
                userId={userId}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
