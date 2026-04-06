import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import useTheme from "../../hooks/useTheme";

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 bg-base-100 border-b border-base-300 h-[60px] flex items-center justify-between px-8">
      {/* Logo */}
      <div className="font-serif text-xl tracking-tight">
        Rent<span className="text-primary">ara</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6">
        {/* Nav Links */}
        <a
          href="#"
          className="text-[13.5px] text-base-content/55 hover:text-base-content transition-colors"
        >
          Browse
        </a>
        <a
          href="#"
          className="text-[13.5px] text-base-content/55 hover:text-base-content transition-colors"
        >
          How it works
        </a>
        <a
          href="#"
          className="text-[13.5px] text-base-content/55 hover:text-base-content transition-colors"
        >
          List your space
        </a>

        {/* Theme Toggle — same pattern as AdminPage */}
        <label className="relative flex items-center w-16 h-8 rounded-full bg-base-300 cursor-pointer px-1.5 transition-colors">
          <input
            type="checkbox"
            checked={isDark}
            onChange={toggleTheme}
            className="sr-only peer"
          />

          {/* Sliding pill */}
          <div className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-base-100 shadow-md transition-all duration-300 left-1 peer-checked:left-9 flex items-center justify-center">
            <Sun
              size={14}
              className={`absolute transition-all duration-300 text-warning ${isDark ? "opacity-0 scale-50" : "opacity-100 scale-100"}`}
            />
            <Moon
              size={14}
              className={`absolute transition-all duration-300 text-base-content ${isDark ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
            />
          </div>

          {/* Background icons */}
          <Sun size={11} className="text-warning ml-1" />
          <Moon size={11} className="text-base-content/40 ml-auto mr-1" />
        </label>

        {/* Auth Buttons */}
        <Link
          to="/login"
          className="inline-flex items-center px-4 py-[7px] rounded-lg text-[13.5px] font-medium text-base-content hover:text-base-content/80 transition-all"
        >
          Sign in
        </Link>
        <Link
          to="/signup"
          className="inline-flex items-center px-4 py-[7px] rounded-lg text-[13.5px] font-medium bg-primary text-primary-content hover:opacity-85 transition-all"
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
