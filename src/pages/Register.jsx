import { FileStack } from "lucide-react";
import React, { useState } from "react";
import { schmeRegis } from "../validate/SchemaRegis";
import axios from "axios";
import { useNavigate } from "react-router";
import { yupToError } from "../validate/YuptoError";

// {id: '4cc1e87f-1c55-48d6-98b7-db037b2b4d88', email: 'plai@test.codecamp', phone: '8888888888'}

export default function Register() {
  const navi = useNavigate();
  const initialRegister = {
    email: "",
    password: "",
    phone: "",
  };
  const [inputRegis, setInputRegis] = useState(initialRegister);
  const [error, setError] = useState({});
  const hdlChange = (e) => {
    setInputRegis((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const hdlSubmit = async (e) => {
    e.preventDefault();
    try {
      schmeRegis.validateSync(inputRegis, { abortEarly: false });
      const res = await axios.post(
        `https://api-post-ts.onrender.com/api/v1/auth/register`,
        inputRegis
      );
      console.log("res", res.data);
      setInputRegis(initialRegister);
      navi("/login");
    } catch (err) {
      const errObj = yupToError(err);
      setError(errObj);
    }
  };
  return (
    <div className="my-30 ">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto">
        <legend className="fieldset-legend">
          Register <FileStack size={20} />{" "}
        </legend>

        <label className="label">Email : </label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={inputRegis.email}
          name="email"
          onChange={hdlChange}
        />
        {error.email && <p className="text-red-500">{error.email}</p>}

        <label className="label">Password : </label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={inputRegis.password}
          name="password"
          onChange={hdlChange}
        />
        {error.password && <p className="text-red-500">{error.password}</p>}

        <label className="label">Phone : </label>
        <input
          type="tel"
          className="input"
          placeholder="Phone-number"
          value={inputRegis.phone}
          name="phone"
          onChange={hdlChange}
        />
        {error.phone && <p className="text-red-500">{error.phone}</p>}

        <button className="btn btn-neutral mt-4" onClick={hdlSubmit}>
          Register
        </button>
      </fieldset>
    </div>
  );
}
