import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="w-screen h-[90px] text-white bg-black flex justify-between p-2 items-center">
      <div className="flex w-12 p-2 border justify-between">
        <Link to="/">
          <p>0</p>
        </Link>
        <Link to="/key">
          <p>1</p>
        </Link>
      </div>
      <h1 className="text-4xl font-bold">Quiz App</h1>
      <p></p>
    </header>
  );
}

export default Header;
