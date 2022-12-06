import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER } from '../../utils/server';

export const deliverySlice = createSlice({
  name: 'delivery',
  initialState: {},
  reducers: {
    createDelivery: (state, action) => {
      const payload = action.payload;
      return {...state, [payload.delivery_id]: payload};
    },
    updateDelivery: (state, action) => {
      const payload = action.payload;
      return {...state, [payload.delivery_id]: {...state[payload.delivery_id], ...payload.data}};
    },
    removeDelivery: (state, action) => {
      delete state[action.payload];
      return state;
    },
    listDelivery: (state, action) => {
      const temp = {};
      for (const obj of action.payload) {
        temp[obj.delivery_id] = obj;
      }
      return {...state, ...temp};
    },
    getDelivery: (state, action) => {},
  },
});

export const {
  createDelivery,
  updateDelivery,
  removeDelivery,
  listDelivery,
  getDelivery,
} = deliverySlice.actions;

export const createAsyncDelivery =
  ({data, callback,onError}) =>
  async (dispatch, getState) => {
    try {

      const response = await axios.post(`${SERVER}delivery`, data);
     
      if (response.status === 200) {
        dispatch(
          createDelivery({
            ...response.data,
          })
        );

        callback?.();
      } else {
        console.log("Delivery Creation Error===>", response);
        onError?.();
      }
    } catch (error) {
      onError?.();
      console.log('delivery creation error', error);
    }
  };

export const updateAsyncDelivery = async ({data, callback, onError}) =>  {
    try {
      const response = await axios.put(`${SERVER}delivery/${data.delivery_id}`, data);
      if (response.status === 200) {
        return response.data;
      } else {
        onError?.();
      }
    } catch (error) {
      onError?.();
      console.log('update delivery error', error);
    }
  };
export const removeAsyncDelivery = data => (dispatch, getState) => {};

export const listAsyncDelivery = ({callback,onError}) => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${SERVER}delivery`);

      if (response.status === 200) {
        dispatch(listDelivery(response.data));

        callback?.();
      } else {
        console.log("Delivery List Error===>", response);
        onError?.();
      }
  } catch (error) {
    console.log('get delivery error', error);
  }
};

export const listAsyncDeliveryByID = async (deliveryID) => {
  try {
    const response = await axios.get(`${SERVER}delivery/${deliveryID}`);

    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("get delivery by user error", error);
  }
};

export const deleteAsyncDelivery = deliveryID => async dispatch => {
  try {
    
    dispatch(removeDelivery(deliveryID));
  } catch (error) {
    console.log('delete delivery error', error);
  }
};

export default deliverySlice.reducer;
