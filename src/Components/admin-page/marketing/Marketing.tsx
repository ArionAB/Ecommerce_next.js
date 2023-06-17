'use client'

import { Button, Container } from "@mui/material";
import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import styles from "../../../../styles/marketing.module.scss";
import { useAppDispatch, useAppSelector } from "../../../Store";
import {
  selectAbandonedCarts,
  selectAbandonedCartsFilters,
} from "../../../Store/Selectors/cartSelectors";
import {
  getAbandonedCarts,
  sendAbandonedCartEmail,
} from "../../../Store/Thunks/cartThunks";
import { selectCurrentUser } from "../../../Store/Selectors/authenticationSelectors";
import {
  getDateLabel,
  onlyDateFormat,
} from "../../../../src/Utils/Functions/dateTimeFormat";
import styled from "@emotion/styled";
import TablePaginationDemo from "./TablePagination";

 const Marketing = () => {
  const dispatch = useAppDispatch();
  const carts = useAppSelector(selectAbandonedCarts);
  const currentUser = useAppSelector(selectCurrentUser);
  const filters = useAppSelector(selectAbandonedCartsFilters);

  useEffect(() => {
    dispatch(
      getAbandonedCarts({
        filters: {
          token: currentUser?.jwtToken,
          pageNumber: filters.pageNumber,
          pageSize: filters.pageSize,
        },
      })
    );
  }, [filters]);

  function createData(
    cartId: string,
    userId: string,
    dateCreated: string,
    dateModified: string,
    numberEmailsSent: number,
    dateEmailSent: string
  ) {
    return {
      cartId,
      userId,
      dateCreated,
      dateModified,
      numberEmailsSent,
      dateEmailSent,
    };
  }

  const rows = carts?.map((cart) =>
    createData(
      cart.cartId,
      cart.userId,
      cart.dateCreated,
      cart.dateModified,
      cart.numberEmailsSent,
      cart.dateEmailSent
    )
  );

  const Root = styled("div")`
    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
      height: 100%;
    }

    td,
    th {
      border: 1px solid #ddd !important;
      text-align: left;
      padding: 8px;
    }

    th {
      background-color: #ddd;
    }
  `;

  const handleSendEmail = (userId: string) => {
    dispatch(
      sendAbandonedCartEmail({ token: currentUser?.jwtToken, userId: userId })
    );
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        padding: "2rem",
      }}
    >
      <Root
      // component={Paper}
      // sx={{
      //   marginBottom: "2rem",
      // }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID Cart</TableCell>
              <TableCell align="center">ID User</TableCell>
              <TableCell align="center">Data creare</TableCell>
              <TableCell align="center">Data modificare</TableCell>
              <TableCell align="center">Data trimitere mail</TableCell>
              <TableCell align="center">Email-uri trimise</TableCell>
              <TableCell align="center">Trimite mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow
                key={row.cartId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.cartId}</TableCell>
                <TableCell align="center">{row.userId}</TableCell>
                <TableCell align="center">
                  {getDateLabel(row.dateCreated, onlyDateFormat)}
                </TableCell>
                <TableCell align="center">
                  {getDateLabel(row.dateModified, onlyDateFormat)}
                </TableCell>
                <TableCell align="center">
                  {getDateLabel(row.dateEmailSent, onlyDateFormat)}
                </TableCell>
                <TableCell align="center">{row.numberEmailsSent}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => handleSendEmail(row.userId)}
                  >
                    Trimite mail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePaginationDemo />
      </Root>
    </Container>
  );
};

export default Marketing
