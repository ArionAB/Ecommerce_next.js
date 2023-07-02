'use client'

import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "../Thunks/userThunks";

const initialState: any = {
  action: {},
  loadingUsers: false,
  users: null,
  usersFilters: {
    pageNumber: 0,
    searchText: "",
  },
};

export const usersSlice = createSlice({
  name: "usersSlice",
  initialState: initialState,
  reducers: {
    resetUsersState: () => initialState,
    setUsersFilters: (state, action) => {
      state.usersFilters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.loadingUsers = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loadingUsers = false;

      // state.users.totalCount = action.payload.totalCount;
    });
    builder.addCase(getAllUsers.rejected, (state) => {
      state.loadingUsers = false;
    });
  },
});

export const { resetUsersState, setUsersFilters } = usersSlice.actions;
