import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../states/authSlice';

function Navbar() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        ForumKu
      </Link>
      <div className="navbar-links">
        <Link to="/">Threads</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        {token ? (
          <>
            {user && <span>{user.name}</span>}
            <Link to="/threads/new">+ New Thread</Link>
            <button type="button" className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
