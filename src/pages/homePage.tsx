import { LandingPage } from "../components/HomePage/LandingPage";
import { HomeMain } from "../components/HomePage/HomeMain";
import { useEffect, useState } from "react";
import { getAllPosts } from "../repo/repo";
import { Post } from "../types/Post";

export function HomePage() {
  const [latestPost, setLatestPost] = useState<Post>();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getAllPosts().then((posts) => {
      const sortedPosts = posts.sort(sortByDateDesc);
        if (sortedPosts.length === 0) throw new Error("No posts found");
      setLatestPost(sortedPosts[0]);
      setPosts(sortedPosts.slice(1));
    });
  });

  return (
    <>
      <LandingPage post={latestPost!} />
      <HomeMain posts={posts} />
    </>
  );
}

function sortByDateDesc({ published_at: a }: Post, { published_at: b }: Post) {
  if (a === undefined) return 1;
  if (b === undefined) return -1;
  return b.getTime() - a.getTime();
}
