import { csrfFetch } from "./csrf"
import { createSelector } from "reselect";

import { thunkAllPosts, thunkPostById } from "./post";
import { thunkCurrentUserPosts } from "./userPosts";
import { thunkUsersLikes } from "./like";

//ACTON TYPES
const LOAD_USER_COMMENTS = 'comments/load_users'
const DELETE_COMMENT = 'comments/delete_comment'

//ACTION CREATORS
const loadUserComments = (posts) => {
  return {
    type: LOAD_USER_COMMENTS,
    payload: posts
  }
}

const deleteComment = (commentId) => {
  return {
    type: DELETE_COMMENT,
    payload: commentId
  }
}

//THUNKS
export const thunkPostComment = (comment) => async (dispatch) => {
  const { postId } = comment;
  const res = await csrfFetch(`/api/comments/new${postId}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
  })
  if (res.ok) {
    const newComment = await res.json();
    const id = newComment.id; //(creating a comment returns the post, this is the postId)
    await Promise.all([
      dispatch(thunkAllPosts()),
      dispatch(thunkCurrentUserPosts()),
      dispatch(thunkUserComments()),
      dispatch(thunkUsersLikes()),
      dispatch(thunkPostById(id))
    ])
  } else {
    return { 'error': res};
  }
}

export const thunkUserComments = () => async (dispatch) => {
  const res = await csrfFetch('/api/comments/mine')
  if (res.ok) {
    const posts = await res.json()
    dispatch(loadUserComments(posts))
    return posts
  } else {
    return { 'error': res};
  }
}

export const thunkDeleteComment = (commentId) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/delete${commentId}`, {
    method: 'DELETE'
  })
  if (res.ok) {
    await Promise.all([
      dispatch(deleteComment(commentId)),
      dispatch(thunkAllPosts()),
      dispatch(thunkCurrentUserPosts()),
      dispatch(thunkUserComments()),
      dispatch(thunkUsersLikes())
    ])
  } else {
    return { 'error': res};
  }
}

export const thunkUpdateComment = (comment) => async (dispatch) => {
  const { commentId } = comment
  const res = await csrfFetch(`api/comments/edit${commentId}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
  });
  if (res.ok) {
    await Promise.all([
      dispatch(thunkAllPosts()),
      dispatch(thunkCurrentUserPosts()),
      dispatch(thunkUserComments()),
      dispatch(thunkUsersLikes())
    ])
  } else {
    return { 'error': res};
  }
}

//SELECTORS
export const commentsArray = createSelector((state) => state.comments, (comments) => {
  return Object.values(comments);
})

//REDUCER
function commentReducer(state = {}, action) {
  let commentsState = {...state};
  switch (action.type) {
    case LOAD_USER_COMMENTS: {
      commentsState = {};
      action.payload.forEach((post) => {
        commentsState[post.id] = post;
      })
      return commentsState
    }
    case DELETE_COMMENT: {
      delete commentsState[action.payload]
      return commentsState;
    }

    default: {
      return commentsState
    }
  }
}

export default commentReducer;