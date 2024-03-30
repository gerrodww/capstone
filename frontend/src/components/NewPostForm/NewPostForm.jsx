import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkCreatePost } from "../../redux/post";
import './NewPostForm.css';

const NewPostForm = () => {
  const dispatch = useDispatch();

  const [ body, setBody ] = useState('');
  const [ imageUrl, setImageUrl ] = useState('');

  const charLimit = 255;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!body.trim()) return

    const newPost = {
      body, 
      imageUrl
    };
    
    dispatch(thunkCreatePost(newPost));
    setBody('');
    setImageUrl('');
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