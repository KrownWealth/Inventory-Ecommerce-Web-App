"use client"

import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import React from 'react'
import { Button } from '@/components/ui/button'

interface CheckoutProps {
  product: {},
  clientSecret: string
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

const CheckoutForm: React.FC<CheckoutProps> = ({ product, clientSecret }) => {
  return (
    <>
      <Elements options={{ clientSecret }} stripe={stripePromise} >
        <Form />

        <div className='flex items-center justify-center pt-8 pb-4 mx-auto'>
          <Button>
            Proceed to Checkout
          </Button>
        </div>
      </Elements>
    </>
  )
}

export default CheckoutForm

function Form() {
  const stripe = useStripe();
  const elements = useElements();

  return <PaymentElement />
}
