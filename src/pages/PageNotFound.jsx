import React from "react";
import { useNavigate } from "react-router";

export default function PageNotFound() {
  const navi = useNavigate();
  const hdlClick = (path) => {
    navi(`/${path}`);
  };
  return (
    <div className="flex h-screen justify-center items-center text-3xl font-bold flex-col gap-6">
      <p>Please, Login or Register before create post</p>
      <p className="flex gap-5">
        {" "}
        <button className="btn btn-accent" onClick={() => hdlClick("register")}>
          Go to Register
        </button>
        <button className="btn btn-accent" onClick={() => hdlClick("login")}>
          Go to Login
        </button>
      </p>
    </div>
  );
}
