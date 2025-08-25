import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/">Tasks</Link> | <Link to="/notifications">Notifications</Link>
      {user ? (
        <>
          <span style={{ marginLeft: "10px" }}>Hi, {user.name}</span>
          <button onClick={logout} style={{ marginLeft: "10px" }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginLeft: "10px" }}>
            Login
          </Link>
          <Link to="/signup" style={{ marginLeft: "10px" }}>
            Signup
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
