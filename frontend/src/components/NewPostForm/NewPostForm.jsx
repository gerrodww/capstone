import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkCreatePost } from "../../redux/post";
import './NewPostForm.css';

const NewPostForm = () => {
  const dispatch = useDispatch();

  const [ body, setBody ] = useState('');
  const [ imageUrl, setImageUrl ] = useState('');
  const [ error, setError ] = useState({})

  const charLimit = 255;

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setError({})
      if (!body || typeof body !== 'string') {
        throw new Error('Invalid post body');
      }
  
      if (body.trim() !== body) {
        throw new Error('Post body should not begin or end with whitespace');
      }

      const newPost = {
        body, 
        imageUrl
      };
      
      dispatch(thunkCreatePost(newPost));
      setBody('');
      setImageUrl('');

    } catch (error) {
      setError(error)
    }


  }

  return (
    <div className="new-post">
    <div>Create a new post</div>
    <form onSubmit={handleSubmit}>

      <textarea 
      className="new-post-area"
      value={body}
      onChange={(e) => setBody(e.target.value)}
      placeholder="What's on your mind?"
      />
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
      <button type="submit" disabled={body.length < 3 || body.length > charLimit}>Create post</button>
    </form>
    </div>
  )
}

export default NewPostForm;