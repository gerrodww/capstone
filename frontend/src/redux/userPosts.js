import { csrfFetch } from './csrf';
import { createSelector } from 'reselect';

//ACTON TYPES
const LOAD_USER_POSTS = 'posts/load_users'


//ACTION CREATORS
const loadUserPosts = (posts) => {
  return {
    type: LOAD_USER_POSTS,
    payload: posts
  }
}

//THUNKS
export const thunkCurrentUserPosts = () => async (dispatch) => {
  const res = await csrfFetch('/api/posts/mine');
  if (res.ok) {
    const posts = await res.json();
    dispatch(loadUserPosts(posts));
    return posts;
  } else {
    return { 'error': res};
  }
}


//SELECTORS
export const userPostsArray = createSelector((state) => state.userPosts, (posts) => {
  return Object.values(posts);
})

//REDUCER
function userPostReducer(state = {}, action) {
  let userPostsState = {...state};
  switch(action.type) {
    case LOAD_USER_POSTS: {
      userPostsState = {};
      action.payload.forEach((post) => {
        userPostsState[post.id] = post;
      });
      return userPostsState;
    }

    default: {
      return userPostsState;
    }
  }
}

export default userPostReducer;
