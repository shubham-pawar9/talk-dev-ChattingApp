import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./component/chatSlice";

export default configureStore({
  reducer: {
    chat: chatReducer,
  },
});
