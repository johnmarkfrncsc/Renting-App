import { useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import useTheme from "../../hooks/useTheme";

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-base-100 border-b border-base-300">
      {/* Main bar */}
      <div className="h-[60px] flex items-center justify-between px-5 md:px-8">
        {/* Logo */}
        <div className="font-serif text-xl tracking-tight">
          rent<span className="text-primary">ara</span>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="#listing"
            className="text-[13.5px] text-base-content/55 font-medium hover:text-base-content transition-colors"
          >
            Browse
          </a>
          <a
            href="#cta"
            className="text-[13.5px] text-base-content/55 font-medium hover:text-base-content transition-colors"
          >
            How it works
          </a>

          {/* Theme toggle */}
          <label className="relative flex items-center w-16 h-8 rounded-full bg-base-300 cursor-pointer px-1.5 transition-colors">
            <input
              type="checkbox"
              checked={isDark}
              onChange={toggleTheme}
              className="sr-only peer"
            />
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
            <Sun size={11} className="text-warning ml-1" />
            <Moon size={11} className="text-base-content/40 ml-auto mr-1" />
          </label>

          <Link
            to="/login"
            className="inline-flex items-center px-4 py-[7px] rounded-lg text-[13.5px] font-medium border border-base-300 bg-base-100 text-base-content hover:bg-base-200 transition-all"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center px-4 py-[7px] rounded-lg text-[13.5px] font-medium bg-primary text-primary-content hover:opacity-85 transition-all"
          >
            Get started
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <label className="relative flex items-center w-14 h-7 rounded-full bg-base-300 cursor-pointer px-1 transition-colors">
            <input
              type="checkbox"
              checked={isDark}
              onChange={toggleTheme}
              className="sr-only peer"
            />
            <div className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-base-100 shadow-md transition-all duration-300 left-1 peer-checked:left-8 flex items-center justify-center">
              <Sun
                size={12}
                className={`absolute transition-all duration-300 text-warning ${isDark ? "opacity-0 scale-50" : "opacity-100 scale-100"}`}
              />
              <Moon
                size={12}
                className={`absolute transition-all duration-300 text-base-content ${isDark ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
              />
            </div>
            <Sun size={10} className="text-warning ml-1" />
            <Moon size={10} className="text-base-content/40 ml-auto mr-1" />
          </label>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg hover:bg-base-300 transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* dropdown menu */}
      {isOpen && (
        <div className="fixed inset-0 z-100 md:hidden bg-base-100 flex flex-col">
          {/* Header */}
          <div className="h-[60px] flex items-center justify-between px-5 border-b border-base-300">
            <div className="font-serif text-xl tracking-tight">
              rent<span className="text-primary">ara</span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-base-300 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col px-5 py-6 gap-6 text-lg font-medium">
            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="text-base-content/70 hover:text-base-content transition"
            >
              Browse
            </a>

            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="text-base-content/70 hover:text-base-content transition"
            >
              How it works
            </a>

            <a
              href="#"
              onClick={() => setIsOpen(false)}
              className="text-base-content/70 hover:text-base-content transition"
            >
              List your space
            </a>
          </div>

          {/* Bottom buttons */}
          <div className="mt-auto px-5 pb-8 flex flex-col gap-3">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-3 rounded-xl text-sm font-medium border border-base-300 bg-base-100 text-base-content hover:bg-base-200 transition"
            >
              Sign in
            </Link>

            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-3 rounded-xl text-sm font-medium bg-primary text-primary-content hover:opacity-85 transition"
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
