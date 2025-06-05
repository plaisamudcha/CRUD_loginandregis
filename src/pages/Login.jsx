import { KeyRound } from "lucide-react";
import React, { useState } from "react";
import { SchemaLogin } from "../validate/SchemaLogin";
import axios from "axios";
import { useNavigate } from "react-router";
import { yupToError } from "../validate/YuptoError";

// {accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRjY…MxM30.iIex-R9ngQ2_rGjIeUazj2Ld8Pp8t7nUrzFBfj_R_OE', user: {…}}
// accessToken
// :
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRjYzFlODdmLTFjNTUtNDhkNi05OGI3LWRiMDM3YjJiNGQ4OCIsImlhdCI6MTc0OTA1MDMxM30.iIex-R9ngQ2_rGjIeUazj2Ld8Pp8t7nUrzFBfj_R_OE"
// user
// :
// {id: '4cc1e87f-1c55-48d6-98b7-db037b2b4d88', email: 'plai@test.codecamp', phone: '8888888888'}

export default function Login() {
  const navi = useNavigate();
  const initialLogin = {
    email: "",
    password: "",
  };
  const [inputLogin, setInputLogin] = useState(initialLogin);
  const [error, setError] = useState({});
  const hdlChange = (e) => {
    setInputLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const hdlSubmit = async (e) => {
    e.preventDefault();
    try {
      SchemaLogin.validateSync(inputLogin, { abortEarly: false });
      const res = await axios.post(
        `https://api-post-ts.onrender.com/api/v1/auth/login`,
        inputLogin
      );
      console.log("res", res.data);
      const uuid = res.data.user.id;
      const encoded = btoa(uuid);
      setInputLogin(initialLogin);
      navi(`/createpost/${encoded}`);
    } catch (err) {
      const errObj = yupToError(err);
      setError(errObj);
    }
  };

  return (
    <div className="my-30">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto">
        <legend className="fieldset-legend">
          Login <KeyRound size={20} />
        </legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          name="email"
          value={inputLogin.email}
          onChange={hdlChange}
        />
        {error.email && <p className="text-red-500">{error.email}</p>}

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          name="password"
          value={inputLogin.password}
          onChange={hdlChange}
        />
        {error.password && <p className="text-red-500">{error.password}</p>}

        <button className="btn btn-neutral mt-4" onClick={hdlSubmit}>
          Login
        </button>
      </fieldset>
    </div>
  );
}
