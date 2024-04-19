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
      {posts?.length === 0 && <h2>You have not made any posts yet, create your first one above!</h2>}
      {posts?.sort((a, b) => b.id - a.id).map((post) => (
        <div className='post-tile' key={post.id}>
          <div className='post-headline'>
            {post.User.image && (
              <img src={post.User.image} className='userimage-post'/>)}
          <h2>{post.User.username}</h2>
          </div>
          {post.imageUrl && (
            <img src={post.imageUrl} className='body-image'/>)}
            <div className='post-body'>
              <p>{post.body}</p>
              <div className='update-delete'>
                <div className='edit-post'>
                  <OpenModalButton 
                  modalComponent={ <UpdatePostModal post={post}/>}
                  buttonText={"Edit Post"}/>
                </div>
                <div className='delete-post'>
                  <OpenModalButton 
                  modalComponent={ <DeletePostModal post={post}/>}
                  buttonText={"Delete Post"}/>
                </div>
              </div>
            </div>
          {currentUser && post.Comments.length > 0 && (
            <div className='comments-container'>
              <h4>Comments</h4>
                {post.Comments.sort((a, b) => a.id - b.id).map(comment => (
                  <div className='comment' key={comment.id}><div className='comment-content'>
                  <div className='comment-username'>
                    {comment.User.username}:
                  </div>
                  <div className='comment-body'>
                    {comment.body}
                  </div>
                </div> </div>
                  ))}
            </div>
          )}
          {currentUser && (
            <i className="fa-solid fa-thumbs-up">
            <span className='thumbs-up-count'>
              {post.Likes.length}
            </span>
            </i>
            )}
          <div>
            {currentUser && (
              <NewComment postId={post.id}/>
            )}
          </div>
          {currentUser.id && currentUser?.id !== post?.userId && (
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