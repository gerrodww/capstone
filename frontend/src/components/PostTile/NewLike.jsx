import { useDispatch } from "react-redux";
import { thunkPostLike, thunkUsersLikes } from "../../redux/like";

const NewLike = ({ postId }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(thunkPostLike(postId))
    dispatch(thunkUsersLikes())
  }

  return (
    <button onClick={handleSubmit}>Like</button>
  )
}

export default NewLike;