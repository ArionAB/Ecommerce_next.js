import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../Store";
import { selectOrdersFilters } from "../../../Store/Selectors/orderSelectors";
import { setOrdersFilters } from "../../../Store/Slices/orderSlice";
import { useDebounce } from "../../../Utils/Hooks/useDebounce";
import { Grid, TextField, Tooltip } from "@mui/material";
import { Search } from "@mui/icons-material";

const AdminOrdersFilters = () => {
  const filters = useAppSelector(selectOrdersFilters);
  const [search, setSearch] = useState<string>(filters.searchText!);
  const [firstEntryDate, setFirstEntryDate] = useState<string>("");
  const [secondEntryDate, setSecondEntryDate] = useState<string>("");

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

  return (
    <Grid container id="allocations-filters" justifyContent="start">
      <Grid
        className="filters"
        item
        xs={12}
        container
        columnSpacing={4}
        rowSpacing={4}
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
      </Grid>
    </Grid>
  );
};

export default AdminOrdersFilters;
