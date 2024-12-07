import "./App.css";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ComponentProvider } from "./context/componentContext";
import ComponentList from "./components/list-comp/ComponentList";
import CreateSnippet from "./components/create-snippet/CreateSnippet";

const App: React.FC = () => {
    return (
        <ComponentProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<ComponentList />} />
                    <Route path="/create-snippet" element={<CreateSnippet />} />
                </Routes>
            </Router>
        </ComponentProvider>
    );
};

export default App;
