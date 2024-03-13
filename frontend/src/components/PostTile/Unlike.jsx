import { useDispatch } from "react-redux";
import { thunkUnlike, thunkUsersLikes } from "../../redux/like";
import { thunkPostById } from "../../redux/post";

const Unlike = ({ postId }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(thunkUnlike(postId))
    dispatch(thunkUsersLikes())
    dispatch(thunkPostById(postId))
  }

  return (
    <button onClick={handleSubmit}>Unlike</button>
  )
}

export default Unlike;