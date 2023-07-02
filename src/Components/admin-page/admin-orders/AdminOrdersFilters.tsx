'use client'

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../Store";
import { selectOrdersFilters } from "../../../Store/Selectors/orderSelectors";
import { setOrdersFilters } from "../../../Store/Slices/orderSlice";
import { useDebounce } from "../../../Utils/Hooks/useDebounce";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { OrderStatusItems } from "../../selectItems/OrderStatusItems";

const AdminOrdersFilters = () => {
  const filters = useAppSelector(selectOrdersFilters);
  const [search, setSearch] = useState<string>(filters.searchText!);
  const [firstEntryDate, setFirstEntryDate] = useState<string>("");
  const [secondEntryDate, setSecondEntryDate] = useState<string>("");
  const [status, setStatus] = useState<number>(0);

  const debouncedValue = useDebounce(search, 500);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (debouncedValue !== filters.searchText) {
      dispatch(
        setOrdersFilters({
          ...filters,
          searchText: debouncedValue,
        })
      );
    }

    //eslint-disable-next-line
  }, [debouncedValue]);

  useEffect(() => {
    if (firstEntryDate !== "" && secondEntryDate !== "") {
      dispatch(
        setOrdersFilters({
          ...filters,
          firstEntryDate: firstEntryDate,
          secondEntryDate: secondEntryDate,
        })
      );
    }

    //eslint-disable-next-line
  }, [firstEntryDate, secondEntryDate]);

  const handleChangeOrderStatus = (e: SelectChangeEvent<number>) => {
    if (e.target.value !== 0) {
      setStatus(e.target.value as number);
      dispatch(
        setOrdersFilters({
          ...filters,
          status: e.target.value,
        })
      );
    } else {
      dispatch(
        setOrdersFilters({
          ...filters,
          status: null,
        })
      );
      setStatus(0);
    }
  };

  return (
    <Grid container id="allocations-filters" justifyContent="start">
      <Grid
        className="filters"
        item
        xs={12}
        container
        columnSpacing={4}
      // rowSpacing={4}
      >
        <Tooltip title="Filtru doar dupa comenzile de la userii care au cont">
          <Grid item xs={12} md={2.4}>
            <TextField
              label="Nume, prenume, orderId"
              value={search}
              fullWidth
              onChange={(e) => setSearch(e.target.value)}
              variant="standard"
              size="small"
              InputProps={{
                endAdornment: <Search />,
              }}
            />
          </Grid>
        </Tooltip>
        <Grid item xs={12} md={2.4} display="flex" gap={2}>
          <TextField
            id="date"
            label="De la data"
            type="date"
            defaultValue=""
            size="small"
            onChange={(e) => setFirstEntryDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="date"
            label="Pana la data "
            type="date"
            defaultValue=""
            size="small"
            onChange={(e) => setSecondEntryDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={2.4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Status comanda
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Status comanda"
              onChange={(e) => {
                handleChangeOrderStatus(e);
              }}
            >
              <MenuItem value={0}>Toate</MenuItem>
              {OrderStatusItems.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminOrdersFilters;
