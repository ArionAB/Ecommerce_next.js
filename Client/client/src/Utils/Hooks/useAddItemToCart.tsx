import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../Store";
import { ProductItemModel } from "../../Store/Models/Product/ProductItem";
import { selectCurrentUser } from "../../Store/Selectors/authenticationSelectors";
import { setCartItems } from "../../Store/Slices/cartSlice";
import { addItemToCart, getCartItems } from "../../Store/Thunks/cartThunks";

//@ts-ignore
const useAddItemToCart: FC<{
  item: ProductItemModel;
  size: number;
  qty: number;
  setOpenCart: Function;
}> = ({ item, size, qty, setOpenCart }) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const addToCart = () => {
    if (!currentUser?.jwtToken) {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const alreadyExists = cart.find(
        (cartItem: ProductItemModel) =>
          cartItem.productId === item.productId &&
          cartItem.sizeType === Number(size) &&
          cartItem.fruitType === item.fruitType
      );

      if (alreadyExists) {
        Object.keys(cart).forEach((key) => {
          if (
            cart[key].productId === item.productId &&
            cart[key].sizeType === Number(size) &&
            cart[key].fruitType === item.fruitType
          ) {
            cart[key].quantity += Number(qty);
          }
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch(
          setCartItems(JSON.parse(localStorage.getItem("cart") || "[]"))
        );
        setOpenCart(true);
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify([
            ...cart,
            {
              ...item,
              quantity: Number(qty),
              sizeType: size,
            },
          ])
        );
        dispatch(
          setCartItems(JSON.parse(localStorage.getItem("cart") || "[]"))
        );
        setOpenCart(true);
        return;
      }
    } else
      dispatch(
        addItemToCart({
          data: {
            cartItems: [
              {
                productId: item.productId.toString(),
                quantity: Number(qty),
                sizeType: Number(size),
              },
            ],
          },

          token: currentUser?.jwtToken,
        })
      )
        .then(() => {
          dispatch(
            getCartItems({
              token: currentUser?.jwtToken,
            })
          );
          setOpenCart(true);
        })
        .catch((error) => console.error("Error adding item to cart:", error));
  };

  return { addToCart };
};

export default useAddItemToCart;
