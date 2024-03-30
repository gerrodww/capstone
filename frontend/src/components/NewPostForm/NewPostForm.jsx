import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { thunkCreatePost } from "../../redux/post";
import './NewPostForm.css';

const NewPostForm = () => {
  const dispatch = useDispatch();

  const [ body, setBody ] = useState('');
  const [ imageUrl, setImageUrl ] = useState('');
  const [ error, setError ] = useState({})

  const charLimit = 255;

  // useEffect(() => {
  //   let newErr = [];
  //   if (body.startsWith(' ')) {
  //     newErr.push('Body cannot start with an empty space')
  //   }
  //   if (body.length < 3 && body.length > 0) {
  //     newErr.push('Body length cannot be less than 3')
  //   }
  //   if (newErr.length > 0) {
  //     setError(newErr)
  //   }
  // }, [body, error])

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setError({})
      if (body.startsWith(' ')) {
        throw new Error('Body cannot start with an empty space')
      }
      if (body.length < 3 && body.length > 0) {
        throw new Error('Body length cannot be less than 3')
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
      if (!error.message) {
        let newError = {};
        newError.message = error;
        setError(newError)
      } else {
        setError(error)
      }
    }
  }

  const clearForm = () => {
    setBody('')
    setError({})
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
      <button type="submit">Create post</button>
      {body.length > 0 && (
      <button onClick={clearForm}>Clear form</button>
      )}
    </form>
    </div>
  )
}

export default NewPostForm;