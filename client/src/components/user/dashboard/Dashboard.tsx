import React from "react";
import { Link } from "react-router-dom";
import { useComponentContext } from "../../../context/componentContext";
import { deleteComponent } from "../../../services/ComponentService";
import { DashboardContainer, SnippetCard } from "./styles";
import { toast } from "sonner";

const Dashboard: React.FC = () => {
  const { components, setComponents } = useComponentContext();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this snippet?")) {
      try {
        await deleteComponent(id);
        setComponents((prev) => prev.filter((component) => component.id !== id));
        toast.success("Snippet deleted successfully", {
          className: "toast",
        });
      } catch (error) {
        console.error("Error deleting snippet:", error);
        alert("Failed to delete snippet. Please try again.");
      }
    }
  }

  return (
    <DashboardContainer>
      <h1>Your Snippets</h1>
      <Link 
        style={{
          display: "inline-block",
          marginTop: "10px",
          marginBottom: "20px",
          padding: "5px 10px",
          backgroundColor: "#ff7226",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          textDecoration: "none",
          cursor: "pointer",
        }}
        to="/create-snippet">Create one</Link>
      {components.length === 0 ? (
        <>
          <p>No snippets found.</p>
        </>
      ) : (
        components.map((component) => (
          <SnippetCard key={component.id}>
            <h3>{component.name}</h3>
            <p>{component.description}</p>
            <pre>{component.codeSnippet}</pre>
            <p>
              <strong>Tags:</strong> {component.tags.join(", ")}
            </p>

            <Link style={{
              display: "inline-block",
              marginTop: "10px",
              marginLeft: "10px",
              padding: "5px 10px",
              backgroundColor: "#ff7226",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              textDecoration: "none",
              cursor: "pointer",
            }} to={`/update-snippet/${component.id}`}>Edit</Link>

            <button style={{
              display: "inline-block",
              marginTop: "10px",
              marginLeft: "10px",
              padding: "5px 10px",
              backgroundColor: "#333333",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }} onClick={() => handleDelete(component.id)}>Delete</button>
          </SnippetCard>
        ))
      )}
    </DashboardContainer>
  );
};

export default Dashboard;
