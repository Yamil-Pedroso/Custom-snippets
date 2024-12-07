import React from "react";
import { useComponentContext } from "../../context/componentContext";

const ComponentList: React.FC = () => {
    const { components } = useComponentContext();

    return (
        <div>
            {components.length === 0 ? (
                <p>No components found</p>
            ) : (
                components.map((component) => (
                    <div
                        key={component.id}
                        style={{
                            border: "1px solid #ccc",
                            margin: "10px",
                            padding: "10px",
                            borderRadius: "8px",
                        }}
                    >
                        <h2>{component.name}</h2>
                        <p>{component.description}</p>
                        <pre style={{ backgroundColor: "#f4f4f4", padding: "10px", color: "#000" }}>
                            {component.codeSnippet}
                        </pre>
                        <p>
                            <strong>Tags:</strong> {component.tags.join(", ")}
                        </p>
                        <p>
                            <strong>Created At:</strong> {new Date(component.createdAt).toLocaleString()}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
};

export default ComponentList;
