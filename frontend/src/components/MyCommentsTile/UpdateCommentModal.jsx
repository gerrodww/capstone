import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkUpdateComment } from "../../redux/comment";

function UpdateCommentModal({ comment }) {
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const commentId = comment.id 

  const [ body, setBody ] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const [ errors, setErrors ] = useState('')

  useEffect(() => {
    if (comment) {
      setBody(comment.body)
      setImageUrl(comment.imageUrl)
    }
  }, [comment])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentDetails = { body, imageUrl, commentId }
    const res = await dispatch(thunkUpdateComment(commentDetails))
    if (res) {
      setErrors({res})
    } else {
      closeModal()
    }
  }

  return (
    <>
      <div>
        <h2>Edit Comment</h2>
        <form onSubmit={handleSubmit}>
          <div>
          <textarea 
            value={body}
            onChange={(e) => setBody(e.target.value)}
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

export default UpdateCommentModal;