import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  LayoutDashboard,
  Building2,
  Users,
  Menu,
  X,
  Search,
  Plus,
  Download,
  MoreHorizontal,
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
      {/* --- Mobile Sidebar Overlay --- */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* --- Sidebar (Hidden on mobile, visible on md+) --- */}
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
          <button className="md:hidden" onClick={() => setIsMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="px-4 space-y-1">
          <NavItem icon={<LayoutDashboard size={18} />} label="Overview" />
          <NavItem icon={<Building2 size={18} />} label="Portfolio" active />
          <NavItem icon={<Users size={18} />} label="People" />
          <NavItem
            icon={<LogOut size={18} />}
            label="Log out"
            onClick={handleLogout}
          />
        </nav>
      </aside>

      {/* --- Main Content --- */}
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
          {/* Desktop Title & Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="hidden md:block text-3xl font-bold text-gray-900">
              Portfolio
            </h2>
            <div className="flex gap-2 w-full md:w-auto">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium">
                <Download size={16} /> Import
              </button>
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium">
                <Plus size={16} /> Add Property
              </button>
            </div>
          </div>

          {/* Scrollable Tabs */}
          <div className="flex gap-6 border-b border-gray-200 mb-6 overflow-x-auto no-scrollbar whitespace-nowrap text-sm font-medium text-gray-500">
            <button className="pb-4 border-b-2 border-green-600 text-green-600">
              Units
            </button>
            <button className="pb-4 border-b-2 border-transparent">
              Properties
            </button>
            <button className="pb-4 border-b-2 border-transparent">
              Keys & Locks
            </button>
          </div>

          {/* Filter Bar - Responsive Stack */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties"
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              <FilterButton label="Type" />
              <FilterButton label="Status" />
            </div>
          </div>

          {/* Table Container - Horizontal Scroll on Mobile */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[800px]">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500">
                  <tr>
                    <th className="px-6 py-4 uppercase">Property</th>
                    <th className="px-6 py-4 uppercase">Status</th>
                    <th className="px-6 py-4 uppercase">Market Rent</th>
                    <th className="px-6 py-4 uppercase text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  <TableRow
                    property="Boardman Main House"
                    status="Occupied"
                    rent="$6,760"
                  />
                  <TableRow
                    property="Blue Sky Towers"
                    status="Vacant"
                    rent="$0.000"
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Sub-components
const NavItem = ({ icon, label, active = false, onClick }) => (
  <button
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${active ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:bg-gray-50"}`}
    onClick={onClick}
  >
    {icon} {label}
  </button>
);

const FilterButton = ({ label }) => (
  <button className="whitespace-nowrap px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 font-medium">
    {label}
  </button>
);

const TableRow = ({ property, status, rent }) => (
  <tr className="hover:bg-gray-50">
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gray-200 rounded shrink-0"></div>
        <span className="font-semibold">{property}</span>
      </div>
    </td>
    <td className="px-6 py-4">
      <span
        className={`px-2 py-1 rounded-full text-xs ${status === "Occupied" ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700"}`}
      >
        ● {status}
      </span>
    </td>
    <td className="px-6 py-4 font-bold">{rent}</td>
    <td className="px-6 py-4 text-right flex justify-end gap-2">
      <button className="bg-black text-white px-3 py-1 rounded text-xs">
        View
      </button>
      <button className="md:hidden p-1 border rounded text-gray-400">
        <MoreHorizontal size={16} />
      </button>
    </td>
  </tr>
);

export default AdminPage;
