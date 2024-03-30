import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { thunkDeletePost } from '../../redux/post'
import './DeletePostModal.css'

function DeletePostModal({ post }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const { id } = post;

  function confirmDelete(id, e) {
    e.preventDefault();
    return dispatch(thunkDeletePost(id))
    .then(closeModal)
  }

  return (
    <>
      <div>
        <h2>Are you sure you want to delete this post?</h2>
        <p>{post.body}</p>
      <div>
        <button className="delete-post-button" onClick={(e) => confirmDelete(id, e)}>Yes (Delete this post)</button>
        <button className='keep-post' onClick={closeModal}>No (Keep this post)</button>
      </div>
      </div>
      
    </>
  )
}

export default DeletePostModal;