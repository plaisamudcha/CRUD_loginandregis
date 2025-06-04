import { PencilOff } from "lucide-react";
import React, { useState } from "react";
import { schemaPost } from "../validate/SchemaPost";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { yupToError } from "../validate/YuptoError";

export default function PostCard({ item }) {
  const userId = useAuthStore((state) => state.userId);
  const [error, setError] = useState({});
  const initialEdit = {
    title: "",
    content: "",
    imgUrl: "",
    id: item.id,
  };
  const [isEdit, setIsEdit] = useState(false);
  const [inputEdit, setInputEdit] = useState(initialEdit);
  const hdlEdit = () => {
    setIsEdit(true);
  };
  const hdlChange = (e) => {
    setInputEdit((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const hdlSave = async () => {
    try {
      schemaPost.validateSync(inputEdit, { abortEarly: false });
      const res = await axios.put(
        `https://api-post-ts.onrender.com/api/v1/posts/${userId}`,
        inputEdit
      );
      console.log("res", res.data);
      setIsEdit(false);
    } catch (err) {
      const errObj = yupToError(err);
      setError(errObj);
    }
  };
  const hdlDelete = async () => {
    try {
      let result = prompt('put "ok" or "sure" to delete your post');
      if (result === "ok" || result === "sure") {
        await axios.delete(
          `https://api-post-ts.onrender.com/api/v1/posts/${userId}/${item.id}`
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="card bg-base-100 w-96 shadow-sm py-3">
      {!isEdit ? (
        <figure>
          <img src={item.imgUrl} alt={item.title} />
        </figure>
      ) : (
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto">
          <legend className="fieldset-legend">
            Edit post <PencilOff size={20} />
          </legend>

          <label className="label">title</label>
          <input
            type="text"
            className="input"
            placeholder="title..."
            name="title"
            value={inputEdit.title}
            onChange={hdlChange}
          />
          {error.title && <p className="text-red-500">{error.title}</p>}

          <label className="label">content</label>
          <input
            type="text"
            className="input"
            placeholder="content..."
            name="content"
            value={inputEdit.content}
            onChange={hdlChange}
          />
          {error.content && <p className="text-red-500">{error.content}</p>}

          <label className="label">image</label>
          <input
            type="text"
            className="input"
            placeholder="image..."
            name="imgUrl"
            value={inputEdit.imgUrl}
            onChange={hdlChange}
          />
          {error.imgUrl && <p className="text-red-500">{error.imgUrl}</p>}
        </fieldset>
      )}
      <div className="card-body">
        {!isEdit && <h2 className="card-title">{item.title}</h2>}
        {!isEdit && <p>{item.content}</p>}
        <div className="card-actions justify-end">
          {!isEdit ? (
            <button className="btn btn-primary" onClick={hdlEdit}>
              Edit
            </button>
          ) : (
            <button className="btn btn-primary" onClick={hdlSave}>
              Save
            </button>
          )}
          <button className="btn btn-primary" onClick={hdlDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
