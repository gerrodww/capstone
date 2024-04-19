import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkCreatePost } from "../../redux/post";
import './NewPostForm.css';

const NewPostForm = () => {
  const dispatch = useDispatch();

  const [ body, setBody ] = useState('');
  const [ error, setError ] = useState({})

  const [ imgUrl, setImgUrl ] = useState("")
  const [ showUpload, setShowUpload ] = useState(true);
  const [ previewUrl, setPreviewUrl ] = useState("");

  const charLimit = 280;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError({})
      if (!imgUrl) {
        if (body.trim().length === 0) {
          throw new Error('Post cannot be empty')
        }
        if (body.startsWith(' ')) {
          throw new Error('Post cannot start with an empty space')
        }
        if (body.length < 3 && body.length >= 0) {
          throw new Error('Post length cannot be less than 3')
        }
        if (body.trim() !== body) {
          throw new Error('Post should not begin or end with whitespace');
        }
        if (body.length > charLimit) {
          throw new Error('Post must be 280 characters or less');
        }
      }

      if (imgUrl && body) {
        if (body.startsWith(' ')) {
          throw new Error('Post cannot start with an empty space')
        }
        if (body.length < 3 && body.length >= 0) {
          throw new Error('Post length cannot be less than 3')
        }
        if (body.trim() !== body) {
          throw new Error('Post should not begin or end with whitespace');
        }
        if (body.length > charLimit) {
          throw new Error('Post must be 280 characters or less');
        }
      }

      const newPost = {
        body,
        imgUrl
      };
      
      await dispatch(thunkCreatePost(newPost));
      setBody('');
      setImgUrl('');
      setPreviewUrl('')
      setShowUpload(true)

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

  const updateImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewUrl(reader.result);
    }
    setImgUrl(file);
    setShowUpload(false)
  }

  const clearForm = () => {
    setError({})
    setBody('')
    setImgUrl('')
    setPreviewUrl('')
    setShowUpload(true)
  }

  const errorCheck = () => {
    return Object.keys(error).length > 0;
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
      {showUpload && (
        <>
          <label htmlFor='file-upload'>Select From Computer 
            <input
            type='file'
            id='file-upload'
            name='img_url'
            onChange={updateImage}
            accept='.jpg, .jpeg, .png, .gif'/>
          </label>
        </>)}
      {!showUpload && (
        <div>
          <img 
          src={previewUrl}
          alt='preview'/>
          <button onClick={() => setShowUpload(true)}>Clear File</button>
        </div>)}
      </div>
      <div>
        {error && (
          <p className="error">{error.message}</p>
        )}
      </div>
      <br />
      
      <button type="submit">Create post</button>
      {errorCheck() || body.length > 0 && (
      <button onClick={clearForm}>Clear form</button>
    )}
    </form>
    </div>
  )
}

export default NewPostForm;