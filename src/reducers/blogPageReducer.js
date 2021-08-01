import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    coverImage: "",
    blogImage: "",
    title: "",
    blogContent: [],
    createdAt: null,
    updatedAt: null,
}

export const getUpdatedPost = createAsyncThunk(
    'blogPost/getUpdatedPostFromDatabase',
    async (id) => {
      return axios(`/blog/${id}`)
                .then(res => res.data)
    }
  )

const blogPageReducer = createSlice({
    name: "blogPage",
    initialState,
    reducers: {
        setActiveBlog: ( state, action ) => {
            state.coverImage = action.payload.coverImage;
            state.blogImage = action.payload.blogImage;
            state.title = action.payload.title;
            state.blogContent = action.payload.blogContent;
            state.createdAt = action.payload.createdAt;
            state.updatedAt = action.payload.updatedAt;
            // console.log(Object.isFrozen(state.blogContent))
        },
        clearActiveBlog: ( state, action ) => {
            state.coverImage = "";
            state.blogImage = "";
            state.title = "";
            state.blogContent = [];
            state.createdAt = null;
            state.updatedAt = null;
        }
    },
    extraReducers: {
        [getUpdatedPost.fulfilled]: (state, action) => {
            state.coverImage = action.payload.coverImage;
            state.blogImage = action.payload.blogImage;
            state.title = action.payload.title;
            state.blogContent = action.payload.blogContent;
            state.createdAt = action.payload.createdAt;
            state.updatedAt = action.payload.updatedAt;
            // console.log(Object.isFrozen(state.blogContent))
        }
    }
});

export const selectActiveBlog = state => state.blogPage
export const { setActiveBlog, clearActiveBlog } = blogPageReducer.actions
export default blogPageReducer.reducer