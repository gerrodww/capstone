import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteComment } from "../../redux/comment";

function DeleteCommentModal({ comment }) {
  const { closeModal } = useModal();
  const { id } = comment;
  const dispatch = useDispatch();

  function confirmDelete(id, e) {
    e.preventDefault();
    return dispatch(thunkDeleteComment(id))
    .then(closeModal)
  }

  return (
    <>
    <div>
      <h2>Are you sure you want to delete this comment?</h2>
      <p>{comment.body}</p>
    <div>
      <button className="delete-post-button" onClick={(e) => confirmDelete(id, e)}>Yes (Delete this Comment)</button>
      <button className='keep-post' onClick={closeModal}>No (Keep this comment)</button>
    </div>
    </div>
    </>
  )
}

export default DeleteCommentModal;