import { useLocation, useNavigate } from "react-router-dom"

const LogoDiv = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const click = () => {
        if (location.pathname !== '/') {
            navigate('/')
            return
        }
    }

    return (<div style={{ margin: '10px', cursor: 'pointer' }} onClick={() => click()} >
        <span className='logo-text'>Post</span><span className='logo-text bolder'>Board</span>
    </div>)
}

export default LogoDiv