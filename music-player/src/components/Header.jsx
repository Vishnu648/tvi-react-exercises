import React from "react";
import { Link } from "react-router-dom";

function Header({ title, logout }) {
  return (
    <header>
      {logout ? <p></p> : ""}

      <h1>{title}</h1>
      {logout ? (
        <Link to="/login">
          <button className="logout">Logout</button>
        </Link>
      ) : (
        ""
      )}
    </header>
  );
}

export default Header;
