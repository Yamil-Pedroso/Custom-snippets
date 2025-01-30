import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useComponentContext } from "../../../context/componentContext";
import { deleteComponent, getComponentsByCategory, getUserComponents, IComponent } from "../../../services/ComponentService";
import { DashboardContainer, SnippetCard } from "./styles";
import { toast } from "sonner";

const categories = ["JavaScript", "Python", "CSS", "React", "Backend", "Database", "Others"];

const Dashboard: React.FC = () => {
  const { components, setComponents, updateVisibility } = useComponentContext();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const fetchComponents = async () => {
        try {
            if (selectedCategory === "") {
                const data = await getUserComponents(); // Carga todos los snippets si "All Categories"
                setComponents(data);
            } else {
                const data = await getComponentsByCategory(selectedCategory); // Filtra por categoría
                setComponents(data);
            }
        } catch (error) {
            console.error("Error fetching components:", error);
        }
    };

    fetchComponents();
}, [selectedCategory]);

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
  };

  const generateWhatsAppLink = (component: IComponent) => {
    const message = `Hola,\n\nQuiero compartir contigo este snippet:\n\n${component.name}\n\n${component.codeSnippet}\n\nPuedes verlo en: ${component.shareUrl}`;
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
};

const generateEmailLink = (component: IComponent) => {
    const subject = `Snippet Compartido: ${component.name}`;
    const body = `Hola,\n\nQuiero compartir contigo este snippet:\n\n${component.name}\n\n${component.codeSnippet}\n\nPuedes verlo en: ${component.shareUrl}`;
    return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};



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
        to="/create-snippet">
        Create one
      </Link>

      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>

      {components.length === 0 ? (
        <p>No snippets found.</p>
      ) : (
        components.map((component) => (
          <SnippetCard key={component.id}>
            <h3>{component.name}</h3>
            <p>{component.description}</p>
            <p><strong>Category:</strong> {component.category}</p>
            <pre>{component.codeSnippet}</pre>
            <p>
              <strong>Tags:</strong> {component.tags.join(", ")}
            </p>

            {/* Botón para cambiar visibilidad */}
            <button
              style={{
                display: "inline-block",
                marginTop: "10px",
                marginLeft: "10px",
                padding: "5px 10px",
                backgroundColor: component.isPublic ? "#28a745" : "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => updateVisibility(component.id, !component.isPublic)}
            >
              {component.isPublic ? "Make Private" : "Make Public"}
            </button>

            {/* Mostrar solo si es público */}
            {component.isPublic && component.shareUrl && (
              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => navigator.clipboard.writeText(component.shareUrl)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  📋 Copy Link
                </button>
                <a
                  href={generateWhatsAppLink(component)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginLeft: "10px",
                    padding: "5px 10px",
                    backgroundColor: "#25D366",
                    color: "#fff",
                    textDecoration: "none",
                    borderRadius: "4px",
                  }}
                >
                  📲 WhatsApp
                </a>
                <a
                  href={generateEmailLink(component)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginLeft: "10px",
                    padding: "5px 10px",
                    backgroundColor: "#ea4335",
                    color: "#fff",
                    textDecoration: "none",
                    borderRadius: "4px",
                  }}
                >
                  📩 Gmail
                </a>
              </div>
            )}

            {/* Botones de editar y eliminar */}
            <Link
              style={{
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
              }}
              to={`/update-snippet/${component.id}`}
            >
              Edit
            </Link>

            <button
              style={{
                display: "inline-block",
                marginTop: "10px",
                marginLeft: "10px",
                padding: "5px 10px",
                backgroundColor: "#333333",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => handleDelete(component.id)}
            >
              Delete
            </button>
          </SnippetCard>
        ))
      )}
    </DashboardContainer>
  );
};

export default Dashboard;
