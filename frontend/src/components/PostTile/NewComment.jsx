import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkPostComment } from "../../redux/comment";

const NewComment = ({ postId }) => {
  const dispatch = useDispatch();

  const [ body, setBody ] = useState('');
  const [ imageUrl, setImageUrl ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!body.trim) return

    const comment = {
      body,
      imageUrl,
      postId
    };

    dispatch(thunkPostComment(comment));
    setBody('');
    setImageUrl('');
  }

  return (
    <>
    <form onSubmit={handleSubmit}>

      <textarea 
      value={body}
      onChange={(e) => setBody(e.target.value)}
      placeholder="Create new comment"
      rows={2}
      cols={35}/>
      <br />
      {/* <input 
      type="text"
      value={imageUrl}
      onChange={(e) => setImageUrl(e.target.value)}
      placeholder="Enter image URL (optional)"/>
      <br /> */}
      <button type="submit">Comment</button>
    </form>
    </>
  )
}

export default NewComment;