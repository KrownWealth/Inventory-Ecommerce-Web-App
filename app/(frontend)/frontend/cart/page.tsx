import { getServerSession } from 'next-auth'
import { CartItems } from '@/views'

const CartPage = () => {

  const session = getServerSession();
  if (!session) {
    return "/auth/sign-in"
  }
  return (
    <section className="max-w-7xl mx-auto items-center justify-center ">
      <CartItems />
    </section>
  )
}

export default CartPage
