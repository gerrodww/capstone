import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from './LoginFormModal';
import SignupFormModal from './SignupFormModal';
import './Verify.css';

function Verify() {
  const currentUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  if (currentUser) {
    navigate('/')
  }

  return (
    <div className='verify-page'>
    <div className='verify-container'>
    <h2 className='verify-title'>Welcome to PostBoard</h2>
    <div className='vertical-line'></div>
    <div className='verify-buttons'>
      <OpenModalButton 
      modalComponent={<LoginFormModal />}
      buttonText={'Login'}
      />
      <OpenModalButton 
      modalComponent={<SignupFormModal />}
      buttonText={'Signup'}/>
    </div>
    </div>
    </div>
  )
}

export default Verify;