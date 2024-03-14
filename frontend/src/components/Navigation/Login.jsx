import { FaUser } from 'react-icons/fa'
import { useModal } from '../../context/Modal'
import LoginFormModal from './LoginFormModal'

const Login = () => {
  const {setModalContent} = useModal();

  return (
      <div className='loginIcon' onClick={() => setModalContent(<LoginFormModal/>)}>
          <FaUser style={{fontSize: '16px', marginRight: '5px'}}/>
          {"Log in"}
      </div>
  )
}

export default Login;
