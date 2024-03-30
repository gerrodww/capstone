import { createSelector } from "reselect";
import { csrfFetch } from "./csrf"

import { thunkAllPosts, thunkPostById } from "./post";
import { thunkCurrentUserPosts } from "./userPosts";
import { thunkUserComments } from "./comment";

//ACTON TYPES
const LOAD_USERS_LIKES = 'likes/user'
const DELETE_LIKE = 'likes/delete'

//ACTION CREATORS
const loadUsersLikes = (likes) => {
  return {
    type: LOAD_USERS_LIKES,
    payload: likes
  }
}

const deleteLike = (id) => {
  return {
    type: DELETE_LIKE,
    payload: id
  }
}

//THUNKS
export const thunkPostLike = (postId) => async (dispatch) => {
  const res = await csrfFetch(`/api/likes/new${postId}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    }
  })
  if (res.ok) {
    const id = postId
    await Promise.all([
      dispatch(thunkAllPosts()),
      dispatch(thunkCurrentUserPosts()),
      dispatch(thunkUserComments()),
      dispatch(thunkUsersLikes()),
      dispatch(thunkPostById(id))
    ])
  } else {
    return { 'error': res}
  }
}

export const thunkUsersLikes = () => async (dispatch) => {
  const res = await csrfFetch('/api/likes/mine');
  if (res.ok) {
    const likes = await res.json();
    dispatch(loadUsersLikes(likes));
    return likes;
  } else {
    return { 'error': res };
  }
}

export const thunkUnlike = (postId) => async (dispatch) => {
  const res = await csrfFetch(`/api/likes/delete${postId}`, {
    method: 'DELETE',
  })
  if (res.ok) {
    const id = postId;
    await Promise.all([
      dispatch(deleteLike(id)),
      dispatch(thunkAllPosts()),
      dispatch(thunkCurrentUserPosts()),
      dispatch(thunkUserComments()),
      dispatch(thunkUsersLikes()),
      dispatch(thunkPostById(id))
    ])
    return {"message": "Post successfully unliked"}
  } else {
    return { 'error': res };
  }
}

//SELECTORS
export const usersLikesArray = createSelector((state) => state.likes, (likes) => {
  return Object.values(likes);
})

//REDUCER
function likeReducer(state = {}, action) {
  let likesState = { ...state};
  switch (action.type) {
    case LOAD_USERS_LIKES: {
      likesState = {};
      action.payload.forEach(post => {
        likesState[post.id] = post;
      });
      return likesState;
    }
    case DELETE_LIKE: {
      delete likesState[action.payload]
      return likesState
    }

    default: {
      return likesState;
    }
  }
}

export default likeReducer;