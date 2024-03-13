import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkCreatePost } from "../../redux/post";
import './NewPostForm.css';

const NewPostForm = () => {
  const dispatch = useDispatch();

  const [ body, setBody ] = useState('');
  const [ imageUrl, setImageUrl ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!body.trim) return

    const newPost = {
      body, 
      imageUrl
    };
    
    dispatch(thunkCreatePost(newPost));
    setBody('');
    setImageUrl('');
  }

  return (
    <>
    <div>Create a new post</div>
    <form onSubmit={handleSubmit}>

      <textarea 
      value={body}
      onChange={(e) => setBody(e.target.value)}
      placeholder="What's on your mind?"
      rows={4}
      cols={50}/>
      <br />
      <input 
      type="text"
      value={imageUrl}
      onChange={(e) => setImageUrl(e.target.value)}
      placeholder="Enter image URL (optional)"/>
      <br />
      <button type="submit">Create post</button>
    </form>
    </>
  )
}

export default NewPostForm;