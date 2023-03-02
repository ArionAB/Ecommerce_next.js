import { Button, Container } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridSortModel,
  GridValueFormatterParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Store";
import {
  selectAllUsers,
  selectLoadingUsers,
  selectUsersFilters,
} from "../../../Store/Selectors/usersSelectors";
import { setUsersFilters } from "../../../Store/Slices/usersSlice";
import { getAllUsers } from "../../../Store/Thunks/userThunks";
import {
  getDateLabel,
  onlyDateFormat,
} from "../../../Utils/Functions/dateTimeFormat";

export const UsersTable = () => {
  const filters = useAppSelector(selectUsersFilters);
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);
  const loading = useAppSelector(selectLoadingUsers);

  const getPaginatedUsers = () => {
    return dispatch(
      getAllUsers({
        filters: filters,
      })
    );
  };
  useEffect(() => {
    let promise = getPaginatedUsers();
    return () => promise.abort();
    //eslint-disable-next-line
  }, [filters]);

  const columns: GridColDef[] = [
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      minWidth: 150,
    },

    {
      field: "userId",
      headerName: "ID User",
      flex: 1,
      minWidth: 300,
    },
    {
      field: "lastName",
      headerName: "Nume",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "firstName",
      headerName: "Prenume",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "createdAt",
      headerName: "Data",
      flex: 1,
      minWidth: 150,
      valueFormatter: (params: GridValueFormatterParams) =>
        getDateLabel(params.value, onlyDateFormat),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "totalOrders",
      headerName: "Total comenzi",
      flex: 1,
      minWidth: 150,
    },

    {
      field: "moneySpent",
      headerName: "Total cheltuit",
      flex: 1,
      minWidth: 150,
    },
    /*     {
      field: "",
      headerName: "Optiuni",
      sortable: false,

      flex: 1,
      minWidth: 150,
      align: "center",
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Button
            variant="contained"
            //   color="error"
            onClick={() => {
              // setOpen(true);
              // setSelectedOrder(params.row);
            }}
          >
            Detalii
          </Button>
        );
      },
    }, */
  ];

  const handlePageChange = (page: number) => {
    dispatch(
      setUsersFilters({
        ...filters,
        pageNumber: page,
      })
    );
  };

  const handleSortModelChange = (newModel: GridSortModel) => {
    if (newModel.length === 0) {
      dispatch(
        setUsersFilters({
          ...filters,
          // orderToSortBy: DataGridColumnNames.CreatedAt,
          // sortingOrder: true,
          pageNumber: 0,
        })
      );
    } else {
      dispatch(
        setUsersFilters({
          ...filters,
          // orderToSortBy: orderToSortByItems.find(
          // (x) => x.field === newModel[0].field
          // )?.value,
          sortingOrder: newModel[0].sort === "desc" ? true : false,
          pageNumber: 0,
        })
      );
    }
  };

  return (
    <Container sx={{ maxWidth: "1800px !important" }}>
      <DataGrid
        className="allocations-data-grid"
        // components={{
        //   LoadingOverlay: DataLoadingComponent,
        // }}
        loading={loading}
        page={filters.pageNumber}
        pageSize={10}
        getRowId={(row) => row.userId}
        hideFooterSelectedRowCount={true}
        disableSelectionOnClick={true}
        paginationMode="server"
        localeText={{
          noRowsLabel: "Fără rezultate",
        }}
        sx={{
          "& .MuiDataGrid-row:hover": {
            background: "aliceblue",
            cursor: "pointer",
          },
          height: 650,
          boxShadow: 3,
        }}
        rows={users?.users || []}
        columns={columns}
        onPageChange={handlePageChange}
        rowCount={users?.rowCount}
        disableColumnMenu={true}
        sortingMode="server"
        onSortModelChange={handleSortModelChange}
      ></DataGrid>
    </Container>
  );
};
