import React from "react";
import { NavLink } from "react-router";

export default function Navbar() {
  const menu = [
    { id: 1, name: "Post", to: "/" },
    { id: 2, name: "Create Post", to: "/createpost" },
    { id: 3, name: "Login", to: "/login" },
    { id: 4, name: "Register", to: "/register" },
  ];
  return (
    <div className="flex px-3 gap-3 items-center h-15 bg-primary">
      {menu.map((el) => (
        <NavLink key={el.id} to={el.to} className="btn">
          {el.name}
        </NavLink>
      ))}
    </div>
  );
}
