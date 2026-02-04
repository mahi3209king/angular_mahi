import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    try {
      const response = await api.post("/auth/login", { email, password });
      login(response.data.token, response.data.user);
      navigate("/");
    } catch (err) {
      setError("Unable to log in. Check your credentials.");
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-mist bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold">Welcome back</h1>
      <p className="mt-2 text-sm text-ink/60">Log in to continue your reflections.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-xl border border-mist bg-stone px-3 py-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-xl border border-mist bg-stone px-3 py-2"
          required
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-full border border-ink/20 px-4 py-2 text-sm text-ink/80 hover:text-ink"
        >
          Log in
        </button>
      </form>
      <p className="mt-4 text-sm text-ink/60">
        New here? <Link to="/register" className="text-ink underline">Create an account</Link>.
      </p>
    </div>
  );
};

export default Login;
