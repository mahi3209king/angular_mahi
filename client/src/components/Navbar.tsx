import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { token, user, logout } = useAuth();

  return (
    <header className="border-b border-mist bg-white/80 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-semibold">
          Jivo
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <NavLink to="/" className="text-ink/80 hover:text-ink">
            Feed
          </NavLink>
          {token && (
            <NavLink to="/create" className="text-ink/80 hover:text-ink">
              Write
            </NavLink>
          )}
          {token && user ? (
            <>
              <NavLink to={`/users/${user.id}`} className="text-ink/80 hover:text-ink">
                Profile
              </NavLink>
              <button
                onClick={logout}
                className="rounded-full border border-ink/20 px-3 py-1 text-ink/80 hover:text-ink"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="text-ink/80 hover:text-ink">
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="rounded-full border border-ink/20 px-3 py-1 text-ink/80 hover:text-ink"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
