import { useState } from "react";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import ListingPage from "./pages/ListingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";

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
          />
          <Route
            path="/"
            element={
              <PrivateRoute allowedRoles={["user", "admin"]}>
                <Homepage />
              </PrivateRoute>
            }
          />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/list" element={<ListingPage />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
