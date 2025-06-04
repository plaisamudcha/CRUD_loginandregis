import axios from "axios";
import { create } from "zustand";

export const usePostStore = create((set) => ({
  posts: [],
  fetchPostData: async (id) => {
    const res = await axios.get(
      `https://api-post-ts.onrender.com/api/v1/posts/${id}`
    );
    console.log("id", id);
    console.log("url", `https://api-post-ts.onrender.com/api/v1/posts/${id}`);
    console.log("res", res);

    set({ posts: res.data.posts });
  },
}));
