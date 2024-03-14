import { FaUserPlus } from 'react-icons/fa'
import { useModal } from "../../context/Modal";
import SignupFormModal from "./SignupFormModal";

const Signup = () => {
  const {setModalContent} = useModal();

    return (
        <div className='loginIcon' onClick={() => setModalContent(<SignupFormModal/>)}>
          <FaUserPlus style={{fontSize: '19px', marginRight: '5px'}}/>
          {"Sign up"}
        </div>
    )
}

export default Signup;
