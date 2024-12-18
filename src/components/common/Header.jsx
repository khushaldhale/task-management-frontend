import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

const Header = () => {
  const isAuthenticated = useSelector((state) => {
    return state.auth.isAuthenticated;
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="header">
      <div className="logo">
        <h1>Logo</h1>
        <div className="nav-links">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => {
                  dispatch(logout()).then((action) => {
                    if (action.payload.success) {
                      toast(action.payload.message);
                      navigate("/");
                    } else {
                      toast.error(action.payload.message);
                    }
                  });
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to={"/login"}>Login</Link>

              <Link to={"/register"}>Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
