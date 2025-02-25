import "../styles/Header.css";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
const { isLoggedIn, handleLogout } = useAuth();
  return (
    <header className="header">
      <div className="header-left">
        <span className="store-name">Compass Store</span>
      </div>
      <nav>
        {isLoggedIn ? (
          <>
            <Link className="icon-button" to="/profile">👤</Link> {}
            <Link className="icon-button" to="/cart">🛒</Link> {}
            <button className="login-button" onClick={handleLogout}>Sair</button>
          </>
        ) : (
          <Link to="/login">
            <button className="login-button">Login</button>
          </Link>
        )}
        </nav>
    </header>
  );
};

export default Header;
