import { useSelector } from 'react-redux';
import './PostTile.css';
import NewComment from './NewComment';
import NewLike from './NewLike';
import Unlike from './Unlike';

const PostTile = ({ posts }) => {
  const currentUser = useSelector((state) => state.session.user);

  return (
    <div>
      {posts?.sort((a, b) => b.id - a.id).map((post) => (
        <div key={post.id}>
          <h2>User: {post.User.username}, Post: {post.id}</h2>
          <p>{post.body}</p>
          {currentUser && post.Comments.length > 0 && (
            <div>
              <h4>Comments</h4>
              <ul>
                {post.Comments.sort((a, b) => a.id - b.id).map(comment => (
                  <li key={comment.id}>{comment.body}</li>
                  ))}
              </ul>
            </div>
          )}
          {currentUser && (
            <p>Likes: {post.Likes.length}</p>
            )}
          <div>
            <NewComment postId={post.id}/>
          </div>
          {currentUser && currentUser.id !== post.userId && (
            <>
            {post.Likes.some(like => like.userId === currentUser.id) ? (
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