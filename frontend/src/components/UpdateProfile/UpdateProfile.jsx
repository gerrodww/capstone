import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserThunk } from '../../redux/session'

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [imgUrl, setImgUrl] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUserName] = useState("");
  const [darkMode, setDarkMode] = useState(false)
  const [showUpload, setShowUpload] = useState(true);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (user) {
      setImgUrl(user.image)
      setBio(user.bio)
      setUserName(user.username)
      setDarkMode(user.darkMode)
    }
  }, [user])


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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const image = imgUrl;
    const form = {image, bio, darkMode, username, previewUrl}
    dispatch(updateUserThunk(user.id, form))
  }

  return (
    <div>
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Update Username:
            <input
            type='text'
            value={username}
            onChange={(e) => setUserName(e.target.value)}/>
          </label>
        </div>
        <div>
          <label> Update Bio:
          <textarea 
          value={bio}
          onChange={(e) => setBio(e.target.value)}/>
          </label>
        </div>
        <div>
          <label>Dark Mode:
            <input 
            type='checkbox'
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}/>
          </label>
        </div>
        <div>
          {showUpload && (
            <>
            {user.image && (
              <img src={user.image}/>
            )}
            <label htmlFor='file-upload'>Select From Computer 
              <input
              type='file'
              id='file-upload'
              name='img_url'
              onChange={updateImage}
              accept='.jpg, .jpeg, .png, .gif'
              />
            </label>
              </>
          )}
          {!showUpload && (
            <div>
              <img 
              src={previewUrl}
              alt='preview'
              />
              <button onClick={() => setShowUpload(true)}>Clear File</button>
            </div>
          )}
          <button type='submit'>Change Profile</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProfile;