import { useEffect, useState } from "react";
import api from "../services/api";
import PostCard from "../components/PostCard";
import FilterBar from "../components/FilterBar";

type Post = {
  _id: string;
  title: string;
  content: string;
  category: string;
  ageGroup: string;
  createdAt: string;
  author: { name: string; ageGroup: string };
  likes: string[];
};

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [ageGroup, setAgeGroup] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await api.get("/posts", {
        params: {
          ageGroup: ageGroup || undefined,
          category: category || undefined
        }
      });
      setPosts(response.data);
      setLoading(false);
    };
    fetchPosts();
  }, [ageGroup, category]);

  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold">Stories worth keeping</h1>
        <p className="text-ink/70">
          A quiet place to share lessons, regrets, and advice for the next generation.
        </p>
      </section>
      <FilterBar
        ageGroup={ageGroup}
        category={category}
        onAgeGroupChange={setAgeGroup}
        onCategoryChange={setCategory}
      />
      {loading ? (
        <p className="text-ink/60">Loading reflections...</p>
      ) : (
        <div className="grid gap-6">
          {posts.length === 0 ? (
            <p className="text-ink/60">No posts yet. Be the first to share.</p>
          ) : (
            posts.map((post) => <PostCard key={post._id} post={post} />)
          )}
        </div>
      )}
    </div>
  );
};

export default Feed;
