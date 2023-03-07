import React, { useEffect, useState } from "react";
import {
  getDateLabel,
  onlyDateFormat,
} from "../../../Utils/Functions/dateTimeFormat";
import { useAppDispatch, useAppSelector } from "../../../Store";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridSortModel,
  GridValueFormatterParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Button, Container } from "@mui/material";
import { selectCurrentUser } from "../../../Store/Selectors/authenticationSelectors";
import {
  selectGetOrders,
  selectLoadingOrders,
  selectOrdersFilters,
  selectTotalOrders,
} from "../../../Store/Selectors/orderSelectors";
import { getOrders } from "../../../Store/Thunks/orderThunks";
import { setOrdersFilters } from "../../../Store/Slices/orderSlice";
import { DataGridColumnNames } from "../../../Store/Enums/DataGridColumnNames";
import { orderToSortByItems } from "../../selectItems/OrderToSortByItems";
import {
  ConvertPaymentMethodToLabel,
  ConvertStatusToLabel,
} from "../../../Utils/Functions/ConvertEnum";
import { AdminOrderDetails } from "./AdminOrderDetails";
import { OrderModel } from "../../../Store/Models/Order/OrderModel";

const AdminOrdersTable = () => {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderModel | null>(null);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const filters = useAppSelector(selectOrdersFilters);
  const orders = useAppSelector(selectGetOrders);
  const loading = useAppSelector(selectLoadingOrders);
  const totalCount = useAppSelector(selectTotalOrders);

  const getPaginatedOrders = () => {
    return dispatch(
      getOrders({
        token: currentUser?.jwtToken,
        filters: filters,
      })
    );
  };

  useEffect(() => {
    let promise = getPaginatedOrders();
    return () => promise.abort();
    //eslint-disable-next-line
  }, [filters]);

  const columns: GridColDef[] = [
    {
      field: "lastName",
      headerName: "Nume",
      flex: 1,
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) =>
        params.row?.lastName
          ? params.row?.lastName
          : params.row?.shippingAddress.lastName,
    },

    {
      field: "firstName",
      headerName: "Prenume",
      flex: 1,
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) =>
        params.row?.firstName
          ? params.row?.firstName
          : params.row?.shippingAddress.firstName,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) =>
        params.row?.email
          ? params.row?.email
          : params.row?.shippingAddress.email,
    },
    {
      field: "orderId",
      headerName: "ID Comanda",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "dateCreated",
      headerName: "Data",
      flex: 1,
      minWidth: 150,
      valueFormatter: (params: GridValueFormatterParams) =>
        getDateLabel(params.value, onlyDateFormat),
    },
    {
      field: "paymentMethod",
      headerName: "Metoda de plata",
      flex: 1,
      minWidth: 100,
      valueFormatter: (params: GridValueFormatterParams) =>
        ConvertPaymentMethodToLabel(params.value),
    },
    {
      field: "status",
      headerName: "Status comandă",
      flex: 1,
      minWidth: 150,
      valueFormatter: (params: GridValueFormatterParams) =>
        ConvertStatusToLabel(params.value),
    },
    {
      field: "totalProducts",
      headerName: "Număr produse",
      flex: 1,
      minWidth: 70,
    },
    {
      field: "shippingAddress.address",
      headerName: "Adresa",
      flex: 1,
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) =>
        params.row?.shippingAddress?.address,
    },
    {
      field: "shippingAddress.city",
      headerName: "Orasul",
      flex: 1,
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) =>
        params.row?.shippingAddress?.city,
    },
    {
      field: "shippingAddress.county",
      headerName: "Judetul",
      flex: 1,
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) =>
        params.row?.shippingAddress?.county,
    },
    {
      field: "totalPrice",
      headerName: "Pret total",
      flex: 1,
      minWidth: 70,
    },
    {
      field: "",
      headerName: "Optiuni",
      sortable: false,
      // hide: isEmployer(currentUser?.userType),
      flex: 1,
      minWidth: 100,
      align: "center",
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Button
            variant="contained"
            //   color="error"
            onClick={() => {
              setOpen(true);
              setSelectedOrder(params.row);
            }}
          >
            Detalii
          </Button>
        );
      },
    },
  ];

  const handlePageChange = (page: number) => {
    dispatch(
      setOrdersFilters({
        ...filters,
        pageNumber: page,
      })
    );
  };

  const handleSortModelChange = (newModel: GridSortModel) => {
    if (newModel.length === 0) {
      dispatch(
        setOrdersFilters({
          ...filters,
          orderToSortBy: DataGridColumnNames.CreatedAt,
          sortingOrder: true,
          pageNumber: 0,
        })
      );
    } else {
      dispatch(
        setOrdersFilters({
          ...filters,
          orderToSortBy: orderToSortByItems.find(
            (x) => x.field === newModel[0].field
          )?.value,
          sortingOrder: newModel[0].sort === "desc" ? true : false,
          pageNumber: 0,
        })
      );
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container sx={{ maxWidth: "1800px !important" }}>
      <DataGrid
        className="allocations-data-grid"
        //   components={{
        //     LoadingOverlay: DataLoadingComponent,
        //   }}
        loading={loading}
        page={filters.pageNumber}
        pageSize={10}
        getRowId={(row) => row.orderId}
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
        rows={orders.orders}
        columns={columns}
        onPageChange={handlePageChange}
        rowCount={totalCount}
        disableColumnMenu={true}
        sortingMode="server"
        onSortModelChange={handleSortModelChange}
      ></DataGrid>
      <AdminOrderDetails
        open={open}
        selectedOrder={selectedOrder}
        handleClose={handleClose}
      />
    </Container>
  );
};

export default AdminOrdersTable;
