import React from "react";
import Logo from "../movielogo.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="flex border space-x-8 items-center pl-3 py-4">
      <img className="w-[50px]" src={Logo} alt="" />
      <Link to="/">Movie</Link>
      <Link to="/Watchlist">Watchlist</Link>
    </div>
  );
};

export default Navbar;
