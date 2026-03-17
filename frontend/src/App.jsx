import { AuthProvider } from "./context/AuthContext.jsx";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import OverviewPage from "./pages/OverviewPage.jsx";
import Portfolio from "./pages/PortfolioPage.jsx";
import AddListingPage from "./pages/AddListingPage.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
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
            <Route path="add-listing" element={<AddListingPage />} />
          </Route>
          <Route
            path="/"
            element={
              <PrivateRoute allowedRoles={["user", "admin"]}>
                <Homepage />
              </PrivateRoute>
            }
          />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
