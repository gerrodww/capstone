import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { thunkLogout } from "../../redux/session";
import LogoDiv from "./LogoDiv";
import NewPostForm from "../NewPostForm";
import "./Navigation.css";

function Navigation() {
  const currentUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const location = useLocation();

  const logout = () => {
    dispatch(thunkLogout());
  };

  return (
    <>
    <nav className="nav-bar">
      <div className="top-bar">
        <LogoDiv />
        <div className="nav-buttons">
        {currentUser && (
          <button className='loginIcon' onClick={logout}>Log Out</button>
        )}
        </div>
      </div>
      {currentUser && location.pathname === '/' && (
        <NewPostForm />
        )}
    </nav>
    </>
  );
}

export default Navigation;
