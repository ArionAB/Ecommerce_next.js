'use client'

import { FC, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Store";
import { UserType } from "../../Store/Enums/UserType";

import { AutehticateUserModel } from "../../Store/Models/User/AuthtenticateUserModel";
import { selectCurrentUser } from "../../Store/Selectors/authenticationSelectors";
import {
  setCurrentUser,
  setIsRefreshing,
  setIsSilentRefresh,
} from "../../Store/Slices/authenticateSlice";
import { setCartItems } from "../../Store/Slices/cartSlice";
import { addItemToCart, getCartItems } from "../../Store/Thunks/cartThunks";
import { requestRefreshToken } from "../../Store/Thunks/userThunks";

const RefreshToken: FC = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const handleTokenRefresh = useCallback(
    function (isSilent: boolean) {
      const localStorageToken = localStorage.getItem("user");

      if (localStorageToken) {
        if (isSilent) dispatch(setIsSilentRefresh(true));
        const localStorageTokenParsed = JSON.parse(localStorageToken);
        setCurrentUser({
          ...currentUser,
          jwtToken: localStorageTokenParsed,
        } as AutehticateUserModel);
        dispatch(requestRefreshToken(localStorageTokenParsed));
      } else {
        dispatch(setIsRefreshing(false));
      }
    },
    [dispatch, currentUser]
  );

  useEffect(() => {
    const getCart = localStorage.getItem("cart" || "[]");
    const cart = JSON.parse(getCart || "[]") || [];

    if (!currentUser || currentUser.userType === UserType.Admin) {
      dispatch(setCartItems(JSON.parse(getCart || "[]") || []));
    } else {
      const newCart: any = cart?.map((item: any) => {
        return {
          productId: item.productId.toString(),
          quantity: item.quantity,
          sizeType: item.sizeType,
          mixedFruitId: item.mixedFruitId,
        };
      });

      newCart.length > 0
        ? dispatch(
          addItemToCart({
            data: {
              cartItems: newCart,
            },

            token: currentUser?.jwtToken,
          })
        ).then(() => {
          localStorage.removeItem("cart");
          dispatch(
            getCartItems({
              token: currentUser?.jwtToken,
            })
          );
        })
        : dispatch(
          getCartItems({
            token: currentUser?.jwtToken,
          })
        );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    const interval = setInterval(handleTokenRefresh, 1000 * 60 * 14, true);
    handleTokenRefresh(false);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};

export default RefreshToken;
