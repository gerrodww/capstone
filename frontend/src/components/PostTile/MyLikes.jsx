import { useSelector } from 'react-redux';
import NewComment from './NewComment';
import NewLike from './NewLike';
import Unlike from './Unlike';
import './PostTile.css';

const MyLikes = ({ posts }) => {
  const currentUser = useSelector((state) => state.session.user);

  return (
    <div className='posts-container'>
      {posts.length === 0 && <h2>You have not liked any posts yet</h2>}
      {posts?.sort((a, b) => b.id - a.id).map((post) => (
        <div className='post-tile' key={post.id}>
          <h2>{post.User.username}</h2>
          <p className='post-body'>{post.body}</p>
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
            <i class="fa-solid fa-thumbs-up">
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

export default MyLikes;