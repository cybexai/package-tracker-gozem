import { configureStore } from "@reduxjs/toolkit";
import deliveryReducer from "./features/deliverySlice";
import packageReducer from "./features/packageSlice";

const store = configureStore({
  reducer: {
    delivery: deliveryReducer,
    package: packageReducer,
  },
});

export default store;
