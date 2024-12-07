import "./App.css";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ComponentProvider } from "./context/componentContext";
import ComponentList from "./components/list-comp/ComponentList";
import CreateSnippet from "./components/create-snippet/CreateSnippet";
import UpdateSnippet from "./components/update-snippet/UpdateSnippet";

const App: React.FC = () => {
    return (
        <ComponentProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<ComponentList />} />
                    <Route path="/create-snippet" element={<CreateSnippet />} />
                    <Route path="/update-snippet/:id" element={<UpdateSnippet />} />
                </Routes>
            </Router>
        </ComponentProvider>
    );
};

export default App;
