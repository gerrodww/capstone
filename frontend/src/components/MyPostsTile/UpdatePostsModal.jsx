import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkUpdatePost } from "../../redux/post";
import './DeletePostModal.css';

function UpdatePostModal({ post }) {
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const postId = post.id

  const [ body, setBody ] = useState('')
  const [ imageUrl, setImageUrl ] = useState('')

  const [ errors, setErrors ] = useState({})

  useEffect(() => {
    if (post) {
      setBody(post.body)
      setImageUrl(post.imageUrl)
    }
  }, [post])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postDetails = { body, imageUrl, postId }
    const res = await dispatch(thunkUpdatePost(postDetails))
    if (res) {
      setErrors({res})
    } else {
      closeModal()
    }
  }

  return (
    <>
      <div>
        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <div>
          <textarea 
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What's on your mind?"
            rows={4}
            cols={50} />
            {errors && errors.body && <div className="error">{errors.body}</div>}
          </div>

          {/* <div>
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image Url (optional)"/>
            {errors && errors.imageUrl && <div className="error">{errors.imageUrl}</div>}
          </div> */}

          <button className="update-button" type="submit">Submit Changes</button>
          <button className="update-cancel" onClick={closeModal}>Cancel</button>
        </form>
      </div>
    </>
  )
}

export default UpdatePostModal;