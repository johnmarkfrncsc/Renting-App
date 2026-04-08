import { AuthProvider } from "./context/AuthContext.jsx";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import OverviewPage from "./pages/OverviewPage.jsx";
import Portfolio from "./pages/PortfolioPage.jsx";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* ADMIN (PROTECTED) */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminPage />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/admin/overview" />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="portfolio" element={<Portfolio />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
