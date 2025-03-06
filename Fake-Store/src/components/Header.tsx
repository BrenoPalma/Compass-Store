import "../styles/Header.css";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
const { isLoggedIn, handleLogout } = useAuth();
  return (
    <header className="header">
      <Link to={'/'}>
      <div className="header-left">
        <span className="store-name">Fake Store</span>
      </div>
      </Link>
      <nav>
        {isLoggedIn ? (
          <>
            <Link className="icon-button" to="/profile">👤</Link> {}
            <Link className="icon-button" to="/carts">🛒</Link> {}
            <Link to={'/'}>
            <button className="button" onClick={handleLogout}>Sair</button>
            </Link>
          </>
        ) : (
          <Link to="/login">
            <button className="button">Login</button>
          </Link>
        )}
        </nav>
    </header>
  );
};

export default Header;
