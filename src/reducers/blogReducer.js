import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"
// import { persistor } from 'store';


const initialState = {
  blogPost: [],
  sortedPost: [],
  category: "",
}

export const getBlogPosts = createAsyncThunk(
    'blogPost/getBlogFromDatabase',
    async () => {
      return axios("/blog")
                .then(res => res.data)
    }
)

const blogReducer = createSlice({
    name: "blog",
    initialState,
    reducers: {
      sortByCategory: (state, action) => {
        if (action.payload === "all") {
          state.sortedPost = state.blogPost
          state.category = "";
        } else {
          state.sortedPost = state.blogPost.filter(post => post.category === action.payload)
          state.category = action.payload
        }
      },
      sortByDateCentral: (state, action) => {
        if (action.payload === "latest") {
          state.sortedPost.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
        } else if (action.payload === "oldest") {
          state.sortedPost.sort((a, b) => (a.updatedAt > b.updatedAt ? 1 : -1));
        }
      }
    },
    extraReducers: {
        [getBlogPosts.pending]: ( state, action ) => {
          state.status = "loading"
        },
  
        [getBlogPosts.fulfilled]: ( state, { payload } ) => {
          if (payload) {
            state.blogPost = payload.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
            state.sortedPost = payload.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
            state.status = "success"
          }
        },
  
        [getBlogPosts.rejected]: ( state, action ) => {
          state.status = "failed"
        }
      }
});

export const selectBlogPost = state => state.blogPost
export const { sortByCategory, sortByDateCentral } = blogReducer.actions
export default blogReducer.reducer