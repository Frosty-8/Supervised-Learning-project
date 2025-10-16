import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-br 
    from-indigo-900 via-black to-purple-900 h-20">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-6 ">
        <h1 className="text-xl font-bold text-fuchsia-400 tracking-wide">
          ML Visualizer
        </h1>
        <div className="flex gap-6 text-gray-300">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors ${
                location.pathname === link.path
                  ? "text-fuchsia-300 font-semibold"
                  : "hover:text-fuchsia-300"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
