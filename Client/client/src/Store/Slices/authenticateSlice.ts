import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../Enums/UserType";
import { AuthenticationState } from "../Models/User/AutehnticateState";
import { AutehticateUserModel } from "../Models/User/AuthtenticateUserModel";
import {
  loginUser,
  requestLogout,
  requestRefreshToken,
} from "../Thunks/userThunks";

const initialState: AuthenticationState = {
  actions: {},
  currentUser: null,
  isRefreshing: true,
  isSilentRefresh: false,
  userIsLoggingIn: false,
  userEmail: "",
  verifyEmailSuccess: false,
};

export const authenticationSlice = createSlice({
  name: "authenticationSlice",
  initialState: initialState,
  reducers: {
    resetAuthState: () => initialState,
    setCurrentUser(state, action: PayloadAction<AutehticateUserModel>) {
      state.currentUser = action.payload;
    },
    setIsRefreshing(state, action: PayloadAction<boolean>) {
      state.isRefreshing = action.payload;
    },
    setIsSilentRefresh(state, action: PayloadAction<boolean>) {
      state.isSilentRefresh = action.payload;
    },
    setUserIsLoggingIn(state, action) {
      state.userIsLoggingIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      localStorage.setItem(
        "user",
        JSON.stringify(action.payload.response.jwtToken)
      );
      state.currentUser = action.payload;
      state.userIsLoggingIn = false;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.userIsLoggingIn = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.currentUser = null;
      if (localStorage.getItem("user")) localStorage.removeItem("user");
      state.userIsLoggingIn = false;
    });

    builder.addCase(requestRefreshToken.fulfilled, (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload.jwtToken));
      state.currentUser = action.payload;
      state.isRefreshing = false;
      state.isSilentRefresh = false;
    });
    builder.addCase(requestRefreshToken.pending, (state, action) => {
      state.isRefreshing = true;
    });
    builder.addCase(requestRefreshToken.rejected, (state, action) => {
      state.currentUser = null;
      state.isRefreshing = false;
      state.isSilentRefresh = false;
      if (localStorage.getItem("user")) localStorage.removeItem("user");
    });

    builder.addCase(requestLogout.fulfilled, (state, action) => {
      state.currentUser = null;
      if (localStorage.getItem("user")) localStorage.removeItem("user");
    });
    builder.addCase(requestLogout.rejected, (state, action) => {
      state.currentUser = null;
      if (localStorage.getItem("user")) localStorage.removeItem("user");
    });

    //this is for verifying email
    /*  builder.addCase(requestVerifyToken.fulfilled, (state, action) => {
        if(action.payload!==undefined && action.payload!==null){
          if(action.payload.userType===UserType.APPLICANT){
              localStorage.setItem("user", JSON.stringify(action.payload.jwtToken));
              state.currentUser = action.payload;
          }
        }
        
       
        state.verifyEmailSuccess = true;
      });
      builder.addCase(requestVerifyToken.rejected, (state, action) => {
        state.verifyEmailSuccess = false;
      }); */
  },
});

export const {
  resetAuthState,
  setCurrentUser,
  setIsRefreshing,
  setIsSilentRefresh,
  setUserIsLoggingIn,
} = authenticationSlice.actions;
