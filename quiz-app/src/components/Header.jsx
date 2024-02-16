import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="w-screen h-[90px] text-white bg-black flex justify-center p-2 items-center">
      <h1 className="text-4xl font-bold">Quiz App</h1>
    </header>
  );
}

export default Header;
