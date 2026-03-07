import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  Menu,
  X,
  LogOut,
} from "lucide-react";

const AdminPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isMenuOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 md:hidden">
          <button onClick={() => setIsMenuOpen(true)}>
            <Menu size={24} />
          </button>
          <h2 className="text-lg font-bold">Portfolio</h2>
          <div className="w-6" /> {/* Spacer for centering */}
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ isMenuOpen, onClose, handleLogout }) => (
  <aside
    className={`
      fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
      md:relative md:translate-x-0 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
    `}
  >
    <div className="flex items-center justify-between p-4 mb-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white font-bold">
          P
        </div>
        <h1 className="text-xl font-bold tracking-tight">PrimeStay</h1>
      </div>
      <button className="md:hidden" onClick={onClose}>
        <X size={20} />
      </button>
    </div>

    <nav className="px-4 space-y-1 **:text-black **:hover:bg-gray-500 **:hover:text-white">
      <Link to="/admin/overview">
        <NavItem icon={<LayoutDashboard size={18} />} label="Overview" />
      </Link>
      <Link to="/admin/portfolio">
        <NavItem icon={<Building2 size={18} />} label="Portfolio" />
      </Link>
      <NavItem icon={<Users size={18} />} label="People" />
      <NavItem
        icon={<LogOut size={18} />}
        label="Log out"
        onClick={handleLogout}
      />
    </nav>
  </aside>
);

// NavItem Component
const NavItem = ({ icon, label, active = false, onClick }) => (
  <button
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      active ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:bg-gray-50"
    }`}
    onClick={onClick}
  >
    {icon} {label}
  </button>
);

export default AdminPage;
