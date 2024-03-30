import { csrfFetch } from './csrf';
import { createSelector } from 'reselect';

import { thunkCurrentUserPosts } from './userPosts';
import { thunkUserComments } from './comment';
import { thunkUsersLikes } from './like';

//ACTON TYPES
const LOAD_ALL_POSTS = 'posts/load_all_posts'
const LOAD_POST = 'posts/load_post'
const DELETE_POST = 'posts/delete_post'


//ACTION CREATORS
const loadAllPosts = (posts) => {
  return {
    type: LOAD_ALL_POSTS,
    payload: posts
  }
}

const loadPost = (post) => {
  return {
    type: LOAD_POST,
    payload: post
  }
}

const deletePost = (id) => {
  return {
    type: DELETE_POST,
    payload: id
  }
}


//THUNKS
export const thunkAllPosts = () => async (dispatch) => {
  const res = await csrfFetch('/api/posts/all');
  if (res.ok) {
    const posts = await res.json();
    dispatch(loadAllPosts(posts));
    return posts;
  } else {
    return { 'error': res};
  }
}

export const thunkPostById = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/post${id}`)
  if (res.ok) {
    const post = await res.json();
    dispatch(loadPost(post));
    return post;
  } else {
    return { 'error': res};
  }
}

export const thunkCreatePost = (newPost) => async (dispatch) => {
  const res = await csrfFetch('/api/posts/new', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newPost)
  })
  if (res.ok) {
    const newPost = await res.json();
    const id = newPost.id;
    await Promise.all([
      dispatch(thunkPostById(id)),
      dispatch(thunkAllPosts()),
      dispatch(thunkCurrentUserPosts()),
      dispatch(thunkUserComments()),
      dispatch(thunkUsersLikes())
    ])
  } else {
    return { 'error': res};
  }
}

export const thunkDeletePost = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/delete${id}`, {
    method: 'DELETE'
  })
  if (res.ok) {
    await Promise.all([
      dispatch(deletePost(id)),
      dispatch(thunkAllPosts()),
      dispatch(thunkCurrentUserPosts()),
      dispatch(thunkUserComments()),
      dispatch(thunkUsersLikes()),
    ])
  } else {
    return { 'error': res};
  }
}

export const thunkUpdatePost = (post) => async (dispatch) => {
  const { postId } = post;
  const res = await csrfFetch(`/api/posts/edit${postId}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  });
  if (res.ok) {
    const updatedPost = await res.json();
    await Promise.all([
      dispatch(loadPost(updatedPost)),
      dispatch(thunkAllPosts()),
      dispatch(thunkCurrentUserPosts()),
      dispatch(thunkUserComments()),
      dispatch(thunkUsersLikes()),
      dispatch(thunkPostById(postId))
    ])
  } else {
    return { 'error': res};
  }
}

//SELECTORS
export const postsArray = createSelector((state) => state.posts, (posts) => {
  return Object.values(posts);
})

//REDUCER
function postReducer(state = {}, action) {
  let postsState = { ...state};
  switch (action.type) {
    case LOAD_ALL_POSTS: {
      postsState = {};
      action.payload.forEach((post) => {
        postsState[post.id] = post;
      });
      return postsState;
    }
    case LOAD_POST: {
      postsState[action.payload.id] = action.payload
      return postsState;
    }
    case DELETE_POST: {
      delete postsState[action.payload]
      return postsState;
    }

    default: {
      return postsState;
    }
  }
}

export default postReducer;