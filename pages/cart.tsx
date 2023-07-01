import dynamic from "next/dynamic";

const CartPage = dynamic(() => import("../src/Components/cart-page/CartPage"), {
  ssr: false
})

const Cart = () => {
  return (
    <CartPage />
  )

};

export default Cart;
