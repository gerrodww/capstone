import { useSelector } from 'react-redux';
import DeleteCommentModal from './DeleteCommentModal';
import UpdateCommentModal from './UpdateCommentModal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import NewComment from '../PostTile/NewComment';
import NewLike from '../PostTile/NewLike';
import Unlike from '../PostTile/Unlike';
import './MyCommentsTile.css';

const CommentsTile = ({ posts }) => {
  const currentUser = useSelector((state) => state.session.user);

  return (
    <div className='posts-container'>
      {posts.length === 0 && <h2>You have not left any comments yet</h2>}
      {posts?.sort((a, b) => b.id - a.id).map((post) => (
        <div className='post-tile' key={post.id}>
          <h2>{post.User.username}</h2>
          <p className='post-body'>{post.body}</p>
          {currentUser && post.Comments.length > 0 && (
            <div className='comments-container'>
              <h4 className='comments-title'>Comments</h4>
              
                {post.Comments.sort((a, b) => a.id - b.id).map(comment => (
                  <div className='comment' key={comment.id}>
                    <div className='comment-content'>
                      <div className='comment-username'>
                        {comment.User.username}:
                      </div>
                      <div className='comment-body'>
                        {comment.body}
                      </div>
                    </div> 
                    {currentUser?.id === comment.userId && (
                      <div className='comment-update-delete'>
                        <OpenModalButton 
                        modalComponent={<UpdateCommentModal comment={comment}/>}
                          buttonText={"Edit Comment"}/>
                        <OpenModalButton 
                          modalComponent={<DeleteCommentModal comment={comment}/>}
                          buttonText={"Delete Comment"}/>
                      </div>
                    )}
                  </div>
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

export default CommentsTile;
