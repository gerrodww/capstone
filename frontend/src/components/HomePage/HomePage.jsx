import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkAllPosts, postsArray, userPostsArray } from '../../redux/post';
import { thunkUsersLikes } from '../../redux/like';
import { usersLikesArray } from '../../redux/like';
import { commentsArray, thunkUserComments } from '../../redux/comment';
import Spinner from "../Spinner"
import PostTile from '../PostTile';
import './HomePage.css';


const HomePage = () => {
  const dispatch = useDispatch();
  const [ loaded, setLoaded ] = useState(false);
  const [showUserPosts, setShowUserPosts] = useState(false);
  const [showUserComments, setShowUserComments] = useState(false);
  const [showUserLikes, setShowUserLikes] = useState(false);

  useEffect(() => {
    Promise.all([
      dispatch(thunkAllPosts()),
      dispatch(thunkUserComments()),
      dispatch(thunkUsersLikes())
    ])
    .then(() => setLoaded(true))
    .catch(error => {
      console.error("Error:", error);
    });
  }, [dispatch])

  const currentUser = useSelector((state) => state.session.user);
  const userId = currentUser?.id;
  const allPosts = useSelector(postsArray);
  const userPosts = useSelector((state) => userPostsArray(state, userId));
  const userLikes = useSelector(usersLikesArray)
  const userComments = useSelector(commentsArray)


  const handleShowUserPosts = () => {
    console.log('clicked my posts')
    setShowUserPosts(true);
    setShowUserComments(false);
    setShowUserLikes(false);
  };

  const handleShowUserComments = () => {
    console.log('clicked my comments')
    setShowUserComments(true);
    setShowUserPosts(false);
    setShowUserLikes(false);

  };

  const handleShowUserLikes = () => {
    console.log('clicked my likes')
    setShowUserLikes(true);
    setShowUserPosts(false);
    setShowUserComments(false);
  };

  const handleShowAllPosts = () => {
    console.log('clicked all posts')
    setShowUserPosts(false);
    setShowUserComments(false);
    setShowUserLikes(false);
  };

  if (!loaded) {
    return (
        <Spinner/>
    )
  }

  return (
    <>
      <div className='container'>
        <aside className='side-bar'>
        <ul>
          <li onClick={handleShowAllPosts}>ALL POSTS</li>
          { currentUser && (
            <li onClick={handleShowUserPosts}>MY POSTS</li>
          )}
          { currentUser && (
            <li onClick={handleShowUserComments}>MY COMMENTS</li>
          )}
          { currentUser && (
            <li onClick={handleShowUserLikes}>MY LIKES</li>
          )}
        </ul>
      </aside>
      {!showUserPosts && !showUserComments && !showUserLikes && (
        <PostTile posts={allPosts} />
      )}
      {showUserLikes && currentUser && (
        <PostTile posts={userLikes} />
      )}
      {showUserComments && currentUser && (
        <PostTile posts={userComments} />
      )}
      {showUserPosts && currentUser && (
        <PostTile posts={userPosts} />
      )}
      <div className='right-bar'></div>
      </div>
    </>
  )
}

export default HomePage;