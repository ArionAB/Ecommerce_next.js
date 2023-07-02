'use client'

import { Button } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../src/Store";
import { goToPayment } from "../src/Store/Thunks/paymentThunks";
import { selectCurrentUser } from "../src/Store/Selectors/authenticationSelectors";

const payment = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  const handleclick = () => {
    dispatch(
      goToPayment({
        token: currentUser?.jwtToken,
        data: {
          email: "12",
          paymentType: 1,
        },
      })
    );
  };

  return (
    <div>
      <Button onClick={handleclick}>goToPayment</Button>
    </div>
  );
};

export default payment;
