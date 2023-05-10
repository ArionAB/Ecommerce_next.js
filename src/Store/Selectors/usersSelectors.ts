import { RootState } from "..";
import { UsersFiltersModel } from "../Models/User/UsersFiltersModel";

export const selectAllUsers = (state: RootState): any => state.users.users;

export const selectUsersFilters = (state: RootState): UsersFiltersModel =>
  state.users.usersFilters;

export const selectLoadingUsers = (state: RootState): boolean =>
  state.users.loadingUsers;
