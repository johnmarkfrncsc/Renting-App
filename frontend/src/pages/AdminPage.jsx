import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  Menu,
  X,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import useTheme from "../components/hooks/useTheme.js";

const AdminPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-base-100 text-base-content font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-transparent backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isMenuOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        handleLogout={handleLogout}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="flex items-center p-4 bg-base-100 border-b border-base-300 md:hidden">
          <button onClick={() => setIsMenuOpen(true)}>
            <Menu size={24} />
          </button>
          <h2 className="text-lg font-bold flex-1 text-center">Portfolio</h2>
        </header>

        <div className="flex-1 overflow-y-auto p-5 md:p-3 lg:pt-3">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

// Sidebar Component
const Sidebar = ({
  isMenuOpen,
  onClose,
  handleLogout,
  isDark,
  toggleTheme,
}) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`
        fixed flex flex-col inset-y-0 left-0 z-50 w-55 bg-base-200 border-r border-base-300
        transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-primary-content font-bold">
            R
          </div>
          <h1 className="text-xl font-bold tracking-tight">Rentara</h1>
        </div>
        <button className="md:hidden" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="px-4 space-y-1 flex-1 flex flex-col **:mb-0.5 **:hover:cursor-pointer">
        <div className="space-y-1 **:hover:bg-primary/75 **:hover:text-primary-content">
          <Link to="/admin/overview">
            <NavItem
              icon={<LayoutDashboard size={18} />}
              label="Overview"
              active={isActive("/admin/overview")}
            />
          </Link>
          <Link to="/admin/portfolio">
            <NavItem
              icon={<Building2 size={18} />}
              label="Portfolio"
              active={isActive("/admin/portfolio")}
            />
          </Link>
          <NavItem icon={<Users size={18} />} label="People" />
        </div>

        {/* Bottom actions */}
        <div className="mt-auto pb-4 space-y-1">
          {/* Theme Toggle */}
          <label className="relative flex items-center w-20 h-10 rounded-full bg-base-300 cursor-pointer px-2 transition-colors ml-2">
            <input
              type="checkbox"
              checked={isDark}
              onChange={toggleTheme}
              className="sr-only peer"
            />

            {/* Sliding pill */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-base-100 shadow-md transition-all duration-300 
                  left-1 peer-checked:left-11
                  flex items-center justify-center"
            >
              <Sun
                size={18}
                className={`absolute transition-all duration-300 text-warning
                  ${isDark ? "opacity-0 scale-50" : "opacity-100 scale-100"}`}
              />
              <Moon
                size={18}
                className={`absolute transition-all duration-300 text-base-content
                  ${isDark ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
              />
            </div>

            {/* Background icons */}
            <Sun size={14} className="text-warning ml-2" />
            <Moon size={14} className="text-base-content/40 ml-auto mr-2" />
          </label>

          {/* Logout */}
          <div className="**:hover:bg-error/20 **:hover:text-error">
            <NavItem
              icon={<LogOut size={18} />}
              label="Log out"
              onClick={handleLogout}
            />
          </div>
        </div>
      </nav>
    </aside>
  );
};

// NavItem Component
const NavItem = ({ icon, label, active = false, onClick }) => (
  <button
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      active ? "bg-primary text-primary-content" : "text-base-content"
    }`}
    onClick={onClick}
  >
    {icon} {label}
  </button>
);

export default AdminPage;
