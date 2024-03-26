import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeletePostModal from './DeletePostModal';
import UpdatePostModal from './UpdatePostsModal';
import NewComment from '../PostTile/NewComment';
import NewLike from '../PostTile/NewLike';
import Unlike from '../PostTile/Unlike';
import './MyPostsTile.css';

const PostTile = ({ posts }) => {
  const currentUser = useSelector((state) => state.session.user);

  return (
    <div className='posts-container'>
      {posts?.sort((a, b) => b.id - a.id).map((post) => (
        <div className='post-tile' key={post.id}>
          <div className='title-bar'>
            <h2>{post.User.username}</h2>
            <div className='update-delete'>
              <OpenModalButton 
                modalComponent={ <UpdatePostModal post={post}/>}
                buttonText={"Edit Post"}/>
              <OpenModalButton 
                modalComponent={ <DeletePostModal post={post}/>}
                buttonText={"Delete Post"}/>
            </div>
          </div>
          <p className='post-body'>{post.body}</p>
          {currentUser && post.Comments.length > 0 && (
            <div className='comments-container'>
              <h4>Comments</h4>
                {post.Comments.sort((a, b) => a.id - b.id).map(comment => (
                  <div className='comment' key={comment.id}>{comment.body}</div>
                  ))}
            </div>
          )}
          {currentUser && (
            <p>Likes: {post.Likes.length}</p>
            )}
          <div>
            {currentUser && (
              <NewComment postId={post.id}/>
            )}
          </div>
          {currentUser && currentUser.id !== post.userId && (
            <>
            {post.Likes?.some(like => like.userId === currentUser.id) ? (
            <Unlike postId={post.id}/>
          ) : (
            <NewLike postId={post.id}/>
          )}
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default PostTile;