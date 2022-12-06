import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER } from "../../utils/server";

export const packageSlice = createSlice({
  name: "package",
  initialState: {},
  reducers: {
    createPackage: (state, action) => {
      const payload = action.payload;
      return { ...state, [payload.package_id]: payload };
    },
    updatePackage: (state, action) => {
      const payload = action.payload;
      return {
        ...state,
        [payload.package_id]: { ...state[payload.package_id], ...payload.data },
      };
    },
    removePackage: (state, action) => {
      delete state[action.payload];
      return state;
    },
    listPackage: (state, action) => {
      const temp = {};
      for (const obj of action.payload) {
        temp[obj.package_id] = obj;
      }
      return { ...state, ...temp };
    },
    getPackage: (state, action) => {},
  },
});

export const {
  createPackage,
  updatePackage,
  removePackage,
  listPackage,
  getPackage,
} = packageSlice.actions;

export const createAsyncPackage =
  ({ data, callback, onError }) =>
  async (dispatch, getState) => {
    try {
      const response = await axios.post(`${SERVER}package`, data);

      if (response.status === 200) {
        dispatch(
          createPackage({
            ...response.data,
          })
        );

        callback?.();
      } else {
        console.log("Package Creation Error===>", response);
        onError?.();
      }
    } catch (error) {
      onError?.();
      console.log("package creation error", error);
    }
  };

export const updateAsyncPackage =
  ({ id, data, callback, onError }) =>
  async (dispatch, getState) => {
    try {
      callback?.();
      dispatch(updatePackage({ id, data }));
    } catch (error) {
      onError?.();
      console.log("update package error", error);
    }
  };
export const removeAsyncPackage = (data) => (dispatch, getState) => {};

export const listAsyncPackage =
  ({ callback, onError }) =>
  async (dispatch, getState) => {
    try {
      const response = await axios.get(`${SERVER}package`);

      if (response.status === 200) {
        dispatch(listPackage(response.data));

        callback?.();
      } else {
        console.log("Package List Error===>", response);
        onError?.();
      }
    } catch (error) {
      console.log("get package error", error);
    }
  };

export const listAsyncPackageByID = async (packageID) => {
  try {
    const response = await axios.get(`${SERVER}package/${packageID}`);

    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("get package by user error", error);
  }
};

export const deleteAsyncPackage = ({packageID,callback,onError}) => async (dispatch) => {
  try {
    const response = await axios.delete(`${SERVER}package/${packageID}`);

      if (response.status === 200) {
        dispatch(removePackage(packageID));
        callback?.();
      } else {
        console.log("Package Delete Error===>", response);
        onError?.();
      }
    
  } catch (error) {
    console.log("delete package error", error);
  }
};

export default packageSlice.reducer;
