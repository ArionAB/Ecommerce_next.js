import React, { useEffect, useState } from "react";
import {
  dateTimeFormatOptions,
  getDateLabel,
} from "../../../Utils/Functions/dateTimeFormat";
import { useAppDispatch, useAppSelector } from "../../../Store";
/* import {
//   DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridSortModel,
  GridValueFormatterParams,
  GridValueGetterParams,
} from "@mui/x-data-grid"; */
import {
  Button,
  Container,
  List,
  ListItem,
  Checkbox,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { selectCurrentUser } from "../../../Store/Selectors/authenticationSelectors";
import {
  selectGetOrders,
  selectLoadingOrders,
  selectOrdersFilters,
  selectTotalOrders,
} from "../../../Store/Selectors/orderSelectors";
import {
  changeOrderStatus,
  getOrders,
} from "../../../Store/Thunks/orderThunks";
import { setOrdersFilters } from "../../../Store/Slices/orderSlice";
import { DataGridColumnNames } from "../../../Store/Enums/DataGridColumnNames";
import { orderToSortByItems } from "../../selectItems/OrderToSortByItems";
import {
  ConvertPaymentMethodToLabel,
  ConvertStatusToLabel,
} from "../../../Utils/Functions/ConvertEnum";
import { AdminOrderDetails } from "./AdminOrderDetails";
import { OrderModel } from "../../../Store/Models/Order/OrderModel";
import { OrderStatusType } from "../../../Store/Enums/Order/OrderStatusType";
import { OrderStatusItems } from "../../selectItems/OrderStatusItems";
import AdminOrdersFilters from "./AdminOrdersFilters";
import { Close } from "@mui/icons-material";

const AdminOrdersTable = () => {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderModel | null>(null);
  const [DisplayOrderStatusModal, setDisplayOrderStatusModal] = useState(false);
  const [checked, setChecked] = useState<number>(OrderStatusType.Pending);
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");
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

  /* const columns: GridColDef[] = [
    {
      field: "lastName",
      headerName: "Nume",
      flex: 1,
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) =>
        params.row?.lastName
          ? params.row?.lastName
          : params.row?.shippingAddress?.lastName,
    },

    {
      field: "firstName",
      headerName: "Prenume",
      flex: 1,
      minWidth: 150,
      valueGetter: (params: GridValueGetterParams) =>
        params.row?.firstName
          ? params.row?.firstName
          : params.row?.shippingAddress?.firstName,
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
      field: "userId",
      headerName: "Tip client",
      flex: 1,
      minWidth: 100,
      valueGetter: (params: GridValueGetterParams) => {
        return params.row?.userId === "00000000-0000-0000-0000-000000000000"
          ? "Vizitator"
          : "Client";
      },
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
        getDateLabel(params.value, dateTimeFormatOptions),
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
      minWidth: 100,
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
  ]; */

  const handlePageChange = (page: number) => {
    dispatch(
      setOrdersFilters({
        ...filters,
        pageNumber: page,
      })
    );
  };

 /*  const handleSortModelChange = (newModel: GridSortModel) => {
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
  }; */

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeOrderStatus = (orderId: string) => {
    setSelectedOrderId(orderId);
    setDisplayOrderStatusModal(true);
  };

  const handleToggle = (value: number) => () => {
    setChecked(value);
  };

  const handleSaveOrderStatus = () => {
    dispatch(
      changeOrderStatus({
        token: currentUser?.jwtToken,
        order: {
          orderId: selectedOrderId,
          status: checked,
        },
      })
    ).then(() => {
      setDisplayOrderStatusModal(false);
      setSelectedOrderId("");
      getPaginatedOrders();
    });
  };

  return (
    <Container sx={{ maxWidth: "1800px !important", position: "relative" }}>
      <AdminOrdersFilters />
      {DisplayOrderStatusModal && (
        <List
          dense
          sx={{
            width: "100%",
            maxWidth: 360,
            boxShadow: 1,
            bgcolor: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            zIndex: 2,
            right: "20%",
          }}
        >
          <Close
            onClick={() => setDisplayOrderStatusModal(false)}
            sx={{
              cursor: "pointer",
              textAlign: "right",
              float: "right",
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          />
          <Typography variant="h6">{selectedOrderId}</Typography>
          {OrderStatusItems.map((item) => {
            const labelId = `checkbox-list-secondary-label-${item.label}`;
            return (
              <ListItem
                key={item.value}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(item.value)}
                    checked={checked === item.value}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemText id={labelId} primary={item.label} />
                </ListItemButton>
              </ListItem>
            );
          })}
          <Button variant="contained" onClick={handleSaveOrderStatus}>
            Schimbă statusu
          </Button>
        </List>
      )}
      {/* <DataGrid
        className="allocations-data-grid"
        //   components={{
        //     LoadingOverlay: DataLoadingComponent,
        //   }}
        onCellClick={(params) => {
          if (params.field === "status") {
            handleChangeOrderStatus(params.row.orderId);
            setChecked(params.row.status);
          }
        }}
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
      ></DataGrid> */}
      <AdminOrderDetails
        open={open}
        selectedOrder={selectedOrder}
        handleClose={handleClose}
      />
    </Container>
  );
};

export default AdminOrdersTable;
