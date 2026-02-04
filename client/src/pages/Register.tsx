import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ageGroup, setAgeGroup] = useState("20s");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
        ageGroup,
        bio
      });
      login(response.data.token, response.data.user);
      navigate("/");
    } catch (err) {
      setError("Unable to register. Try another email.");
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-mist bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold">Create your account</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-xl border border-mist bg-stone px-3 py-2"
          required
        />
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
        <select
          value={ageGroup}
          onChange={(event) => setAgeGroup(event.target.value)}
          className="w-full rounded-xl border border-mist bg-stone px-3 py-2"
        >
          <option value="20s">20s</option>
          <option value="30s">30s</option>
          <option value="40s">40s</option>
          <option value="50+">50+</option>
        </select>
        <textarea
          placeholder="Short bio"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          className="min-h-[100px] w-full rounded-xl border border-mist bg-stone px-3 py-2"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-full border border-ink/20 px-4 py-2 text-sm text-ink/80 hover:text-ink"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-sm text-ink/60">
        Already have an account? <Link to="/login" className="text-ink underline">Log in</Link>.
      </p>
    </div>
  );
};

export default Register;
