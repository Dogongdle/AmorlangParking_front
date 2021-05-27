import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducer/userSlice';
import loadingReducer from './reducer/loadingSlice';
import parkingReducer from './reducer/parkingSlice';
import pushReducer from './reducer/pushSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
    parking: parkingReducer,
    push: pushReducer,
  },
});
