import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import CommentSection from "../components/CommentSection";
import { useAuth } from "../context/AuthContext";

type Comment = {
  _id?: string;
  text: string;
  user: { name: string } | string;
  createdAt?: string;
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
  comments: Comment[];
};

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await api.get("/posts");
      const found = response.data.find((item: Post) => item._id === id);
      setPost(found || null);
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  const handleLike = async () => {
    if (!id || !user) return;
    await api.post(`/posts/${id}/like`);
    setPost((prev) =>
      prev
        ? {
            ...prev,
            likes: user?.id
              ? prev.likes.includes(user.id)
                ? prev.likes.filter((like) => like !== user.id)
                : [...prev.likes, user.id]
              : prev.likes
          }
        : prev
    );
  };

  if (loading) {
    return <p className="text-ink/60">Loading story...</p>;
  }

  if (!post) {
    return <p className="text-ink/60">Post not found.</p>;
  }

  return (
    <div className="space-y-6">
      <article className="rounded-2xl border border-mist bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between text-xs uppercase tracking-widest text-ink/50">
          <span>{post.category}</span>
          <span>{post.ageGroup}</span>
        </div>
        <h1 className="mt-4 text-3xl font-semibold">{post.title}</h1>
        <p className="mt-4 whitespace-pre-line text-ink/70">{post.content}</p>
        <div className="mt-6 flex items-center justify-between text-sm text-ink/60">
          <span>By {post.author?.name ?? "Anonymous"}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <button
          onClick={handleLike}
          className="mt-6 rounded-full border border-ink/20 px-4 py-2 text-sm text-ink/80 hover:text-ink"
        >
          {post.likes.length} {post.likes.length === 1 ? "like" : "likes"}
        </button>
      </article>
      <CommentSection postId={post._id} comments={post.comments || []} />
    </div>
  );
};

export default PostDetail;
