import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../Store";
import { selectCurrentUser } from "../../../Store/Selectors/authenticationSelectors";
import { getOrders } from "../../../Store/Thunks/orderThunks";

const AdminOrders = () => {
  const dispatch = useDispatch<any>();
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(
      getOrders({
        token: currentUser?.jwtToken,
        filters: {
          pageNumber: 0,
          orderToSortBy: 1,
          sortingOrder: true,
        },
      })
    );
  }, []);

  return <div>AdminOrders</div>;
};

export default AdminOrders;
