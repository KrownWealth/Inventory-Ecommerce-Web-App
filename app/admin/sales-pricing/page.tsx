import { SalesPricePage } from '@/views'
import React from 'react'
import RootLayout from '../layout'

const SalesPrice = () => {
  return (
    <RootLayout pageTitle="Pricing" showInputSearch={true}>
      <SalesPricePage />
    </RootLayout>
  )

}

export default SalesPrice
