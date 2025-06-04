import { Pen } from "lucide-react";
import React, { useState } from "react";
import { schemaPost } from "../validate/SchemaPost";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { yupToError } from "../validate/YuptoError";
import { useNavigate } from "react-router";

export default function CreatePost() {
  const initialCreate = {
    title: "",
    content: "",
    imgUrl: "",
  };
  const [inputCreate, setInputCreate] = useState(initialCreate);
  const userId = useAuthStore((state) => state.userId);
  const [error, setError] = useState({});
  const navi = useNavigate();
  const hdlChange = (e) => {
    setInputCreate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const hdlSubmit = async (e) => {
    e.preventDefault();
    try {
      schemaPost.validateSync(inputCreate, { abortEarly: false });
      const res = await axios.post(
        ` https://api-post-ts.onrender.com/api/v1/posts/${userId}`,
        inputCreate
      );
      console.log("res", res.data);
      navi("/");
    } catch (err) {
      const errObj = yupToError(err);
      setError(errObj);
    }
  };
  return (
    <div className="my-30 ">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto">
        <legend className="fieldset-legend">
          Create Post <Pen size={20} />{" "}
        </legend>

        <label className="label">Title : </label>
        <input
          type="text"
          className="input"
          placeholder="post your title..."
          name="title"
          value={inputCreate.title}
          onChange={hdlChange}
        />
        {error.title && <p className="text-red-500">{error.title}</p>}

        <label className="label">Content : </label>
        <input
          type="text"
          className="input"
          placeholder="what do you think..."
          name="content"
          value={inputCreate.content}
          onChange={hdlChange}
        />
        {error.content && <p className="text-red-500">{error.content}</p>}

        <label className="label">ImgUrl : </label>
        <input
          type="text"
          className="input"
          placeholder="show some pics..."
          name="imgUrl"
          value={inputCreate.imgUrl}
          onChange={hdlChange}
        />
        {error.imgUrl && <p className="text-red-500">{error.imgUrl}</p>}

        <button className="btn btn-neutral mt-4" onClick={hdlSubmit}>
          Post
        </button>
      </fieldset>
    </div>
  );
}
