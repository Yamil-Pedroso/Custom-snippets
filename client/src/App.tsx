import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ComponentProvider } from "./context/componentContext";
import { UserProvider } from "./context/userContext";
import ProtectedRoute from "./components/auth/protected-route/ProtectedRoute";
import AdminRoute from "./components/auth/admin-route/AdminRoute";
import HomePage from "./pages/HomePage";
import UserManagementPage from "./pages/UserManagementPage";
import Blog1Page from "./pages/Blog1Page";
import Blog2Page from "./pages/Blog2Page";
import Blog3Page from "./pages/Blog3Page";
import Navbar from "./components/navbar/Navbar";
import ComponentList from "./components/list-comp/ComponentList";
import CreateSnippet from "./components/create-snippet/CreateSnippet";
import UpdateSnippet from "./components/update-snippet/UpdateSnippet";
import PublicSnippet from "./components/public-snippets/PublicSnippets";

import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import Profile from "./components/user/profile/Profile";
import Dashboard from "./components/user/dashboard/Dashboard";
import { Toaster } from "sonner";

const App: React.FC = () => {
  return (
    <ComponentProvider>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Toaster
            style={{
              padding: "1rem",
            }}
            position="top-right"
            duration={5000}
          />
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/user-snippets" element={<ComponentList />} />
              <Route
                path="/create-snippet"
                element={
                  <ProtectedRoute>
                    <CreateSnippet />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/update-snippet/:id"
                element={
                  <ProtectedRoute>
                    <UpdateSnippet />
                  </ProtectedRoute>
                }
              />

              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/user-management"
                element={
                  <AdminRoute>
                    <UserManagementPage />
                  </AdminRoute>
                }
              />
              <Route path="/snippets/:id" element={<PublicSnippet />} />

              <Route path="/blog1" element={<Blog1Page />} />
              <Route path="/blog2" element={<Blog2Page />} />
              <Route path="/blog3" element={<Blog3Page />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </UserProvider>
    </ComponentProvider>
  );
};

export default App;
