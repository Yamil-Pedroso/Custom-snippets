import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ComponentProvider } from "./context/componentContext";
import HomePage from "./pages/HomePage";
import Navbar from "./components/navbar/Navbar";
import ComponentList from "./components/list-comp/ComponentList";
import CreateSnippet from "./components/create-snippet/CreateSnippet";
import UpdateSnippet from "./components/update-snippet/UpdateSnippet";

import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import Profile from "./components/user/profile/Profile";
import Dashboard from "./components/user/dashboard/Dashboard";

const App: React.FC = () => {
    return (
        <ComponentProvider>
            <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Router>
            <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/user-snippets" element={<ComponentList />} />
                    <Route path="/create-snippet" element={<CreateSnippet />} />
                    <Route path="/update-snippet/:id" element={<UpdateSnippet />} />

                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />

                    <Route path="/profile" element={<Profile />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Router>
            </ThemeProvider>
        </ComponentProvider>
    );
};

export default App;
