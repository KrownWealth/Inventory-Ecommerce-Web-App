import { CartItems, CheckoutButton } from '@/components/custom-ui/reuseables'
import { Button } from '@/components/ui/button'
import React from 'react'

const CartPage = () => {

  const handleCheckout = () => {

  }
  return (
    <section className="w-full">
      <div className="max-w-7xl flex flex-col mx-auto items-center justify-center">
        <CartItems />
        <CheckoutButton />
      </div>
    </section>
  )
}

export default CartPage
