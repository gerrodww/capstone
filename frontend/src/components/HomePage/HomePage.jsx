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
  const [ activeTab, setActiveTab ] = useState('allPosts');

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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
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
        <ul className='side-list'>
            <li className={`list-item ${activeTab === 'allPosts' ? 'list-item-clicked' : ''}`} onClick={() => handleTabClick('allPosts')}>ALL POSTS</li>
            {currentUser && (
              <li className={`list-item ${activeTab === 'userPosts' ? 'list-item-clicked' : ''}`} onClick={() => handleTabClick('userPosts')}>MY POSTS</li>
            )}
            {currentUser && (
              <li className={`list-item ${activeTab === 'userComments' ? 'list-item-clicked' : ''}`} onClick={() => handleTabClick('userComments')}>MY COMMENTS</li>
            )}
            {currentUser && (
              <li className={`list-item ${activeTab === 'userLikes' ? 'list-item-clicked' : ''}`} onClick={() => handleTabClick('userLikes')}>MY LIKES</li>
            )}
          </ul>
      </aside>
      <div className='main-content'>
          {activeTab === 'allPosts' && (
            <PostTile posts={allPosts} />
          )}
          {activeTab === 'userLikes' && currentUser && (
            <MyLikes posts={userLikes} />
          )}
          {activeTab === 'userComments' && currentUser && (
            <CommentsTile posts={userComments} />
          )}
          {activeTab === 'userPosts' && currentUser && (
            <MyPostsTile posts={userPosts} />
          )}
        </div>
        <div className='right-bar'></div>
      </div>
    </>
  )
}

export default HomePage;