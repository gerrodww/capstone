import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkAllPosts, postsArray, userPostsArray } from '../../redux/post';
import { thunkUsersLikes } from '../../redux/like';
import Spinner from "../Spinner"
import PostTile from '../PostTile';
import NewPostForm from '../NewPostForm';
import './HomePage.css';


const HomePage = () => {
  const [ loaded, setLoaded ] = useState(false);
  const [ showUserOnly, setShowUserOnly ] = useState(false); //(add handler to set to true to see users posts)
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.session.user);
  const userId = currentUser?.id;
  const allPosts = useSelector(postsArray);
  const userPosts = useSelector((state) => userPostsArray(state, userId));

  const postsToDisplay = showUserOnly ? userPosts : allPosts;

  useEffect(() => {
    dispatch(thunkUsersLikes())
    dispatch(thunkAllPosts()).then(() => setLoaded(true))
  }, [dispatch])

  if (!loaded) {
    return (
        <Spinner/>
    )
  }

  return (
    <>
      <h2>Home Page</h2>
      <NewPostForm />
      <div><PostTile posts={postsToDisplay}/></div>
    </>
  )
}

export default HomePage;