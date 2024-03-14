import { csrfFetch } from "./csrf"
import { thunkPostById } from "./post";
import { createSelector } from "reselect";

//ACTON TYPES
const LOAD_USER_COMMENTS = 'comments/load_users'

//ACTION CREATORS
const loadUserComments = (posts) => {
  return {
    type: LOAD_USER_COMMENTS,
    payload: posts
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
    dispatch(thunkPostById(id)).then(() => dispatch(thunkUserComments()))
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

    default: {
      return commentsState
    }
  }
};

export default commentReducer;