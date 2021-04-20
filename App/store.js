import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducer/userSlice';
import loadingReducer from './reducer/loadingSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
  },
});
