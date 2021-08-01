import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from "redux"; 
import blogReducer from "../reducers/blogReducer"
import blogPageReducer from "../reducers/blogPageReducer";

const reducers = combineReducers({
  //...         
  blogPost: blogReducer,
  blogPage: blogPageReducer,
 });

//  storage.removeItem('persist:root')

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer
});



// export const store = configureStore({
//   reducer: {
//     blogPost: blogReducer,
//     blogPage: blogPageReducer,
//   }
// });
