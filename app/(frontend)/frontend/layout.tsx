import { Footer, Header } from '@/views'
import React from 'react'

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
    <Header />
    <main className='py-10'>{children}</main>
    <Footer />
    </>
  )
}

export default Layout
