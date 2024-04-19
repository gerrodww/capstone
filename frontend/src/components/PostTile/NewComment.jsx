import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkPostComment } from "../../redux/comment";
import './NewComment.css';

const NewComment = ({ postId }) => {
  const dispatch = useDispatch();

  const [ body, setBody ] = useState('');
  const [ imageUrl, setImageUrl ] = useState('');
  const [ error, setError ] = useState({})

  const charLimit = 280;

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setError({})
      if (body.startsWith(' ')) {
        throw new Error('Comment cannot start with an empty space')
      }
      if (body.length < 3 && body.length >= 0) {
        throw new Error('Comment length cannot be less than 3')
      }
      if (body.trim() !== body) {
        throw new Error('Comment should not begin or end with whitespace');
      }
      if (body.length > 280) {
        throw new Error('Comment must be 280 characters or less');
      }

      const comment = {
        body,
        imageUrl,
        postId
      };
  
      dispatch(thunkPostComment(comment));
      setBody('');
      setImageUrl('');
    } catch (error) {
      setError(error)
    }
    
  }

  const clearForm = () => {
    setBody('')
    setError({})
  }

  return (
    <>
    <form onSubmit={handleSubmit}>

      <textarea 
      className="new-comment-area"
      value={body}
      onChange={(e) => setBody(e.target.value)}
      placeholder="Create new comment"
      rows={2}
      cols={35}/>
      <div>
        {body.length}/{charLimit} characters
      </div>
      <div>
        {error && (
          <p className="error">{error.message}</p>
        )}
      </div>
      <br />
      {/* <input 
      type="text"
      value={imageUrl}
      onChange={(e) => setImageUrl(e.target.value)}
      placeholder="Enter image URL (optional)"/>
      <br /> */}
      <button type="submit">Comment</button>
      {body.length > 0 && (
      <button onClick={clearForm}>Clear form</button>
      )}
    </form>
    </>
  )
}

export default NewComment;