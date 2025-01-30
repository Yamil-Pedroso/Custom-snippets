import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useComponentContext } from "../../../context/componentContext";
import {
  deleteComponent,
  getComponentsByCategory,
  getUserComponents,
  IComponent,
} from "../../../services/ComponentService";
import {
  DashboardContainer,
  SnippetCard,
  SnippetHeader,
  SnippetCardWrapper,
  OptionsWrapper,
  OptionButton,
  CategoryDropdown,
  CategoryButton,
  DropdownMenu,
  Options,
} from "./styles";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { MdEditSquare, MdFolderDelete,  MdCreateNewFolder } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { toast } from "sonner";

const categories = [
  "JavaScript",
  "Python",
  "CSS",
  "React",
  "Backend",
  "Database",
  "Others",
];

const Dashboard: React.FC = () => {
  const { components, setComponents, updateVisibility } = useComponentContext();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handleHover = () => {
    setDropdownOpen(true);
  }

  const handleLeave = () => {
    setDropdownOpen(false);
  }


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
        setComponents((prev) =>
          prev.filter((component) => component.id !== id)
        );
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
    return `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setDropdownOpen(false); // Cierra el dropdown al seleccionar
  };

  return (
    <DashboardContainer>
      <SnippetHeader>
        <h1>Your Snippets</h1>
        <Options>
          <Link to="/create-snippet" className="create">
            Create one
            <MdCreateNewFolder size={26} className="icon-plus" />
          </Link>

          <CategoryDropdown>
            <CategoryButton 
                onMouseEnter={() => setDropdownOpen(true)}
               
            >
              <span>Categories </span><BiSolidCategory size={26} className="icon" />
            </CategoryButton>

            {isDropdownOpen && (
              <DropdownMenu
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <li onClick={() => handleCategorySelect("")}>All Categories</li>
                {categories.map((category) => (
                  <li
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </li>
                ))}
              </DropdownMenu>
            )}
          </CategoryDropdown>
        </Options>
      </SnippetHeader>

      <SnippetCardWrapper>
        {components.length === 0 ? (
          <p>No snippets found.</p>
        ) : (
          components.map((component) => (
            <SnippetCard key={component.id}>
              <h3>{component.name}</h3>
              <p>{component.description}</p>
              <p>
                <strong>Category:</strong> {component.category}
              </p>
              <SyntaxHighlighter
                language={"javascript"}
                style={atomDark}
                className="snippet-code"
              >
                {component.codeSnippet}
              </SyntaxHighlighter>
              <p>
                <strong>Tags:</strong> {component.tags.join(", ")}
              </p>

              {/* Botón para cambiar visibilidad */}
              <OptionsWrapper>
                <OptionButton
                  isPublic={component.isPublic}
                  onClick={() =>
                    updateVisibility(component.id, !component.isPublic)
                  }
                >
                  {component.isPublic ? "Make Private" : "Make Public"}
                </OptionButton>

                {/* Mostrar solo si es público */}
                {component.isPublic && component.shareUrl && (
                  <div style={{ marginTop: "10px" }}>
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(component.shareUrl)
                      }
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

                <div>
                  <Link to={`/update-snippet/${component.id}`}>
                    <MdEditSquare size={32} style={{ color: "#1b1b1b" }} />
                  </Link>

                  <div onClick={() => handleDelete(component.id)}>
                    <MdFolderDelete size={34} style={{ color: "#1b1b1b" }} />
                  </div>
                </div>
              </OptionsWrapper>
            </SnippetCard>
          ))
        )}
      </SnippetCardWrapper>
    </DashboardContainer>
  );
};

export default Dashboard;
