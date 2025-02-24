import React from "react";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <span className="store-name">Compass Store</span>
      </div>
      <button className="login-button">Login</button>
    </header>
  );
};

export default Header;
