import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from './LoginFormModal';
import SignupFormModal from './SignupFormModal';

function Verify() {
  const currentUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  if (currentUser) {
    navigate('/')
  }

  return (
    <>
    <h2>Verify</h2>
    <OpenModalButton 
    modalComponent={<LoginFormModal />}
    buttonText={'Login'}
    />
    <br/>
    <OpenModalButton 
    modalComponent={<SignupFormModal />}
    buttonText={'Signup'}/>
    </>
  )
}

export default Verify;