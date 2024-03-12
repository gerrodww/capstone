import { csrfFetch } from "./csrf"

//ACTON TYPES
const LOAD_ALL_POSTS = 'posts/load_all_posts'
const LOAD_MY_POSTS = 'posts/load_my_posts'

//ACTION CREATORS
const loadAllPosts = (posts) => {
  return {
    type: LOAD_ALL_POSTS,
    payload: posts
  }
}

const loadMyPosts = (posts) => {
  return {
    type: LOAD_MY_POSTS,
    payload: posts
  }
}

//THUNKS
export const thunkAllPosts = () => async (dispatch) => {
  const res = await csrfFetch()
}

//SELECTORS

//REDUCER