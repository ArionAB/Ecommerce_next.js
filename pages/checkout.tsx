'use client'
import dynamic from "next/dynamic";

const CheckoutPage = dynamic(() => import("../src/Components/checkout-page/CheckoutPage"), {
  ssr: false
})

export const Checkout = () => {
  return (
    <CheckoutPage />
  )

};

export default Checkout;
