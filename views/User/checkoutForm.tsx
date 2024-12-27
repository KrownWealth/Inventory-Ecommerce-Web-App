"use client"

import { loadStripe } from '@stripe/stripe-js'
import { Elements, LinkAuthenticationElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import React, { FormEvent, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardTitle, CardHeader, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { FormattedPrice } from '@/lib'
import { useCart } from '@/context/CartContext'

interface CheckoutProps {
  clientSecret: string;
  priceInCent: number;
  userId: string
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://inventory-ecommerce-web.vercel.app"
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"


const CheckoutForm: React.FC<CheckoutProps> = ({ clientSecret, priceInCent, userId }) => {
  const { cartItems } = useCart();
  return (
    <Elements options={{ clientSecret }} stripe={stripePromise}>
      <Form priceIncent={priceInCent} orderId={cartItems[0]?.id ?? 0} />
    </Elements>
  );
}

export default CheckoutForm;

function Form({ priceIncent, orderId }: { priceIncent: number, orderId: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !email) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${baseUrl}/frontend/purchase-success`,
        },
      });

      if (error) {
        setErrorMessage(error.message || 'An error occurred during payment.');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <div className="loader">Processing payment...</div>}
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
            <CardDescription className="py-2">Please make use of: 5555&nbsp;&nbsp;5555&nbsp;&nbsp;5555&nbsp;&nbsp;4444 in the card number, and input any future date in the in the expiration date, random number in the CVC.</CardDescription>
          </CardHeader>
          <CardContent>
            <PaymentElement />
            <div className="mt-4">
              <LinkAuthenticationElement onChange={(e) => setEmail(e.value.email)} />
            </div>
            {errorMessage && <div className="text-error">{errorMessage}</div>}
            <CardFooter className="flex justify-center">
              <Button className="my-8" disabled={!stripe || !elements || loading}>
                {loading ? 'Processing...' : `Pay ${FormattedPrice(priceIncent / 100)}`}
              </Button>
            </CardFooter>
          </CardContent>
        </Card>
      </form>
    </>
  );
}

