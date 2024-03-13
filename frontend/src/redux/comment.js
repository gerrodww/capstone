import { csrfFetch } from "./csrf"
import { thunkPostById } from "./post";

//ACTON TYPES

//ACTION CREATORS

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
    dispatch(thunkPostById(id))
  } else {
    return { 'error': res};
  }
}

//SELECTORS

//REDUCER