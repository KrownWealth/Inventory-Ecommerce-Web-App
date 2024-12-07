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
      <main className='pb-12'>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
