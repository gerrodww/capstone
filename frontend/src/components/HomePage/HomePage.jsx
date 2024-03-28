import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkAllPosts, postsArray } from '../../redux/post';
import { thunkUsersLikes } from '../../redux/like';
import { usersLikesArray } from '../../redux/like';
import { commentsArray, thunkUserComments } from '../../redux/comment';
import { thunkCurrentUserPosts, userPostsArray } from '../../redux/userPosts';
import Spinner from "../Spinner"
import PostTile from '../PostTile';
import MyPostsTile from '../MyPostsTile';
import CommentsTile from '../MyCommentsTile';
import MyLikes from '../PostTile/MyLikes';
import './HomePage.css';


const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.session.user);

  const [ loaded, setLoaded ] = useState(false);
  const [showUserPosts, setShowUserPosts] = useState(false);
  const [showUserComments, setShowUserComments] = useState(false);
  const [showUserLikes, setShowUserLikes] = useState(false);

  useEffect(() => {
    Promise.all([
      dispatch(thunkAllPosts()),
      dispatch(thunkCurrentUserPosts()),
      dispatch(thunkUserComments()),
      dispatch(thunkUsersLikes())
    ])
    .then(() => setLoaded(true))
    .catch(error => {
      console.error("Error:", error);
    });
  }, [dispatch])

  const allPosts = useSelector(postsArray);
  const userPosts = useSelector(userPostsArray);
  const userLikes = useSelector(usersLikesArray)
  const userComments = useSelector(commentsArray)

  const handleShowUserPosts = () => {
    setShowUserComments(false);
    setShowUserLikes(false);
    setShowUserPosts(true);
  };

  const handleShowUserComments = () => {
    setShowUserPosts(false);
    setShowUserLikes(false);
    setShowUserComments(true);

  };

  const handleShowUserLikes = () => {
    setShowUserPosts(false);
    setShowUserComments(false);
    setShowUserLikes(true);
  };

  const handleShowAllPosts = () => {
    setShowUserPosts(false);
    setShowUserComments(false);
    setShowUserLikes(false);
  };

  if (!currentUser) {
    navigate('/verify')
  }

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
        <MyLikes posts={userLikes} />
      )}
      {showUserComments && currentUser && (
        <CommentsTile posts={userComments} />
      )}
      {showUserPosts && currentUser && (
        <MyPostsTile posts={userPosts} />
      )}
      <div className='right-bar'></div>
      </div>
    </>
  )
}

export default HomePage;