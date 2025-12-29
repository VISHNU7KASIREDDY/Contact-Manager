import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-sm">
      <h1 className="text-lg font-semibold text-blue-600">📘 Contact Book</h1>
      <div className=" flex justify-evenly gap-24">
        <Link to="/" className="text-gray-700 mt-1 text-xl hover:text-blue-600">Home</Link>
        <Link
          to="/contacts"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Contacts List
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
