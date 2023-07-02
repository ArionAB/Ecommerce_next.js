'use client'

import { ChangeEvent, MouseEvent, useState, useEffect } from "react";
import TablePagination from "@mui/material/TablePagination";
import { useAppDispatch, useAppSelector } from "../../../Store";
import { selectAbandonedCartsFilters } from "../../../Store/Selectors/cartSelectors";
import { setAbandonedCartsFilters } from "../../../Store/Slices/cartSlice";

export default function TablePaginationDemo() {
  const filters = useAppSelector(selectAbandonedCartsFilters);
  const dispatch = useAppDispatch();

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    dispatch(
      setAbandonedCartsFilters({
        ...filters,
        pageNumber: newPage,
      })
    );
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(
      setAbandonedCartsFilters({
        ...filters,
        pageSize: parseInt(event.target.value, 10),

        pageNumber: 0,
      })
    );
  };

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={filters.count}
      rowsPerPage={filters.pageSize}
      page={filters.pageNumber}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
