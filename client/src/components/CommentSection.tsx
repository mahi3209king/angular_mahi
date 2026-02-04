import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

type Comment = {
  _id?: string;
  text: string;
  user: { name: string } | string;
  createdAt?: string;
};

const CommentSection = ({ postId, comments }: { postId: string; comments: Comment[] }) => {
  const { token } = useAuth();
  const [text, setText] = useState("");
  const [items, setItems] = useState<Comment[]>(comments || []);

  const submitComment = async () => {
    if (!text.trim()) return;
    const response = await api.post(`/posts/${postId}/comment`, { text });
    setItems(response.data);
    setText("");
  };

  return (
    <section className="mt-8">
      <h3 className="text-lg font-semibold">Comments</h3>
      <div className="mt-4 space-y-4">
        {items.length === 0 && <p className="text-sm text-ink/60">No comments yet.</p>}
        {items.map((comment, index) => (
          <div key={comment._id ?? index} className="rounded-xl border border-mist bg-white p-4">
            <p className="text-sm text-ink/80">{comment.text}</p>
            {comment.createdAt && (
              <p className="mt-2 text-xs text-ink/50">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
        ))}
      </div>
      {token ? (
        <div className="mt-4 flex flex-col gap-2">
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="min-h-[100px] rounded-xl border border-mist bg-white p-3 text-sm"
            placeholder="Share a thoughtful response"
          />
          <button
            onClick={submitComment}
            className="self-start rounded-full border border-ink/20 px-4 py-2 text-sm text-ink/80 hover:text-ink"
          >
            Add comment
          </button>
        </div>
      ) : (
        <p className="mt-4 text-sm text-ink/60">Log in to comment.</p>
      )}
    </section>
  );
};

export default CommentSection;
