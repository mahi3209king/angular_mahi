import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Career");
  const [ageGroup, setAgeGroup] = useState("20s");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    try {
      await api.post("/posts", { title, content, category, ageGroup });
      navigate("/");
    } catch (err) {
      setError("Unable to publish post.");
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-mist bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold">Share a lesson</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full rounded-xl border border-mist bg-stone px-3 py-2"
          required
        />
        <textarea
          placeholder="Write your story..."
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="min-h-[200px] w-full rounded-xl border border-mist bg-stone px-3 py-2"
          required
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-xl border border-mist bg-stone px-3 py-2"
          >
            <option value="Career">Career</option>
            <option value="Love">Love</option>
            <option value="Marriage">Marriage</option>
            <option value="Money">Money</option>
            <option value="Health">Health</option>
            <option value="Regret">Regret</option>
            <option value="General">General</option>
          </select>
          <select
            value={ageGroup}
            onChange={(event) => setAgeGroup(event.target.value)}
            className="rounded-xl border border-mist bg-stone px-3 py-2"
          >
            <option value="20s">20s</option>
            <option value="30s">30s</option>
            <option value="40s">40s</option>
            <option value="50+">50+</option>
          </select>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          className="rounded-full border border-ink/20 px-4 py-2 text-sm text-ink/80 hover:text-ink"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
