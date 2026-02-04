import { Link } from "react-router-dom";

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

const PostCard = ({ post }: { post: Post }) => {
  return (
    <article className="rounded-2xl border border-mist bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between text-xs uppercase tracking-widest text-ink/50">
        <span>{post.category}</span>
        <span>{post.ageGroup}</span>
      </div>
      <Link to={`/posts/${post._id}`} className="mt-3 block text-2xl font-semibold">
        {post.title}
      </Link>
      <p className="mt-3 line-clamp-3 text-ink/70">{post.content}</p>
      <div className="mt-4 flex items-center justify-between text-sm text-ink/60">
        <span>By {post.author?.name ?? "Anonymous"}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
    </article>
  );
};

export default PostCard;
