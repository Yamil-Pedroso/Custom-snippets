import React from "react";
import { Link } from "react-router-dom";
import { useComponentContext } from "../../context/componentContext";
import { deleteComponent } from "../../services/ComponentService";

const ComponentList: React.FC = () => {
    const { components, setComponents } = useComponentContext();

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this snippet?")) {
            try {
                await deleteComponent(id);
                setComponents((prev) => prev.filter((component) => component.id !== id));
                alert("Snippet deleted successfully!");
            } catch (error) {
                console.error("Error deleting snippet:", error);
                alert("Failed to delete snippet. Please try again.");
            }
        }
    };

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
                        <pre
                            style={{
                                backgroundColor: "#f4f4f4",
                                padding: "10px",
                                color: "#000",
                            }}
                        >
                            {component.codeSnippet}
                        </pre>
                        <p>
                            <strong>Tags:</strong> {component.tags.join(", ")}
                        </p>
                        <p>
                            <strong>Created At:</strong> {new Date(component.createdAt).toLocaleString()}
                        </p>
                        <Link
                            to={`/update-snippet/${component.id}`}
                            style={{
                                display: "inline-block",
                                marginTop: "10px",
                                padding: "5px 10px",
                                backgroundColor: "#007bff",
                                color: "#fff",
                                textDecoration: "none",
                                borderRadius: "4px",
                            }}
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => handleDelete(component.id)}
                            style={{
                                display: "inline-block",
                                marginTop: "10px",
                                marginLeft: "10px",
                                padding: "5px 10px",
                                backgroundColor: "#dc3545",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default ComponentList;
