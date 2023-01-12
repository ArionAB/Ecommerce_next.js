import { FC, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Store";

import { AutehticateUserModel } from "../../Store/Models/User/AuthtenticateUserModel";
import { selectCurrentUser } from "../../Store/Selectors/authenticationSelectors";
import {
  setCurrentUser,
  setIsRefreshing,
  setIsSilentRefresh,
} from "../../Store/Slices/authenticateSlice";
import { getCartItems } from "../../Store/Thunks/cartThunks";
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
    if (!currentUser) return;
    dispatch(
      getCartItems({
        token: currentUser?.jwtToken,
      })
    );
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
