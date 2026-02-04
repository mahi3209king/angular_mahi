import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import PostCard from "../components/PostCard";

type User = {
  _id: string;
  name: string;
  ageGroup: string;
  bio?: string;
};

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

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;
      const [userResponse, postsResponse] = await Promise.all([
        api.get(`/users/${id}`),
        api.get(`/users/${id}/posts`)
      ]);
      setUser(userResponse.data);
      setPosts(postsResponse.data);
    };
    fetchProfile();
  }, [id]);

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-mist bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">{user?.name ?? "Profile"}</h1>
        <p className="mt-2 text-sm uppercase tracking-widest text-ink/50">{user?.ageGroup}</p>
        <p className="mt-4 text-ink/70">{user?.bio ?? "No bio yet."}</p>
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Posts</h2>
        {posts.length === 0 ? (
          <p className="text-ink/60">No posts yet.</p>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Saved posts</h2>
        <p className="text-ink/60">Saved posts will appear here.</p>
      </section>
    </div>
  );
};

export default Profile;
