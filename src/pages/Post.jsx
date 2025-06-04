import React, { useEffect } from "react";
import { usePostStore } from "../store/usePostStore";
import { useAuthStore } from "../store/useAuthStore";
import PostCard from "./PostCard";

export default function Post() {
  const posts = usePostStore((state) => state.posts);
  const fetchData = usePostStore((state) => state.fetchPostData);
  const userId = useAuthStore((state) => state.userId);
  useEffect(() => {
    fetchData(userId);
  }, []);
  return (
    <div className="flex flex-wrap mt-10 gap-10">
      {posts.map((el) => (
        <PostCard key={el.id} item={el} />
      ))}
    </div>
  );
}
