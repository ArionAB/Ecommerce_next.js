'use client'

import { FC } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ConvertMonthToLabel } from "../../../Utils/Functions/ConvertEnum";

export const SalesTable: FC<{
  data: {
    year: number;
    month: number;
    ordersCount: number;
    totalSales: number;
  }[];
}> = ({ data }) => {
  function createData(
    year: number,
    month: number,
    orderCount: number,
    totalSales: number

    // protein: number
  ) {
    return { year, month, orderCount, totalSales };
  }

  const rows = data?.map((row) =>
    createData(row.year, row.month, row.ordersCount, row.totalSales)
  );

  return (
    <TableContainer
      component={Paper}
      sx={{
        marginBottom: "2rem",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Anul</TableCell>
            <TableCell align="center">Luna</TableCell>
            <TableCell align="center">Nr. Comenzi</TableCell>
            <TableCell align="center">Vanzari</TableCell>
            <TableCell align="center">Medie comanda</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              key={row.year}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.year}</TableCell>
              <TableCell align="center">
                {ConvertMonthToLabel(row.month)}
              </TableCell>
              <TableCell align="center">{row.orderCount}</TableCell>
              <TableCell align="center">{row.totalSales}</TableCell>
              <TableCell align="center">
                {row.totalSales / row.orderCount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
