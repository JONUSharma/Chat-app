import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../Pages/Axios/Axios";
import { HandleError, HandleSuccess } from "../../Pages/Toast/Toast";

export const loginUserThunk = createAsyncThunk(
  "/user/login",
  async ({ username, password, email }, { rejectWithValue }) => {
    try {
      const response = await instance.post("user/login", {
        username, password, email
      });
      const msg = response?.data?.msg
      HandleSuccess(msg);
      return response.data

    } catch (error) {
      const errorOutput = error?.response?.data?.errorMessage;
      HandleError(errorOutput)
      return rejectWithValue(errorOutput);
    }
  }
)
export const SignUpUserThunk = createAsyncThunk(
  "/user/signup",
  async ({ username, password, email, gender, fullname, confirmpassword }, { rejectWithValue }) => {
    try {
      const response = await instance.post("/user/signup", {
        username, password, email, gender, fullname, confirmpassword
      });
      const msg = response?.data?.msg
      HandleSuccess(msg);
      return response.data

    } catch (error) {
      const errorOutput = error?.response?.data?.errorMessage;
      HandleError(errorOutput)
      return rejectWithValue(errorOutput);
    }
  }
)
export const LogoutThunk = createAsyncThunk(
  "/user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.post("/user/logout");
      const msg = response?.data?.msg
      HandleSuccess(msg);
      return response.data

    } catch (error) {
      const errorOutput = error?.response?.data?.errorMessage;
      HandleError(errorOutput)
      return rejectWithValue(errorOutput);
    }
  }
)

export const getProfileThunk = createAsyncThunk("/user/getProfile", async (_, { rejectWithValue }) => {
  try {
    const response = await instance.post("/user/getProfile")

    return response.data;
  }
  catch (error) {
    return rejectWithValue(msg);
  }
})

export const getOtherUserThunk = createAsyncThunk("/user/getOtherUser", async (_, { rejectWithValue }) => {
  try {
    const response = await instance.post("/user/getOtherUser")
    return response.data;
  }
  catch (error) {
    return rejectWithValue(msg);
  }
})





