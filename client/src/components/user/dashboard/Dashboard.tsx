/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
  Icons,
  Sidebar,
  ShareLinksWrapper,
} from "./styles";
//import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
//import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  MdEditSquare,
  MdFolderDelete,
  MdCreateNewFolder,
} from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { BiLogoGmail } from "react-icons/bi";
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

  const handleHoverToggle = () => {
    setDropdownOpen((prev) => !prev); // Alternar el estado al hacer hover
  };
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const message = `Hi,\n\nI want to share this snippet with you:\n\n${component.name}\n\n${component.codeSnippet}\n\nYou can open it here: ${component.shareUrl}`;
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  };

  const generateEmailLink = (component: IComponent) => {
    const subject = `Snippet Shared: ${component.name}`;
    const body = `Hi,\n\nI want to share this snippet with you:\n\n${component.name}\n\n${component.codeSnippet}\n\nYou can open it here: ${component.shareUrl}`;
    return `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setDropdownOpen(false); // Cierra el dropdown al seleccionar
  };

  useEffect(() => {
    // click outside dropdown
    function handleClickOutside(event: any) {
      if (event.target.closest(".category-dropdown")) {
        return;
      }
      setDropdownOpen(false);
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <DashboardContainer>
      <Sidebar>
        <SnippetHeader>
          <h1>Dashboard</h1>
          <Options>
            <Link to="/create-snippet" className="create">
              Create one
              <MdCreateNewFolder size={26} className="icon-plus" />
            </Link>

            <CategoryDropdown>
              <CategoryButton onMouseEnter={handleHoverToggle}>
                <span>Categories </span>
                <BiSolidCategory size={26} className="icon" />
              </CategoryButton>

              {isDropdownOpen && (
                <DropdownMenu
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 1, type: "tween", ease: "easeInOut" }}
                >
                  <li onClick={() => handleCategorySelect("")}>
                    All Categories
                  </li>
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
      </Sidebar>

      <SnippetCardWrapper>
        {components.length === 0 ? (
          <p>No snippets found.</p>
        ) : (
          components.map((component) => (
            <SnippetCard key={component.id}>
              <div>
                <div>
                  <h3>{component.name}</h3>
                  <p>{component.description}</p>
                  <p>
                    <strong>Category:</strong> {component.category}
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: "#2a2a2a",
                    color: "#f5f5f5",
                    padding: "1rem",
                    borderRadius: "10px",
                    fontFamily: "monospace",
                    fontSize: "1rem",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    height: "20rem",
                    overflowY: "auto",
                  }}
                >
                  {component.codeSnippet}
                </div>

                <p>
                  <strong>Tags:</strong> {component.tags.join(", ")}
                </p>
              </div>

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
                  <ShareLinksWrapper
                    as={motion.div}
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{
                      duration: 1.5,
                      type: "tween",
                      ease: "easeInOut",
                    }}
                  >
                    <p
                      onClick={() => {
                        navigator.clipboard.writeText(component.shareUrl);
                        toast.success("Link copied to clipboard", {
                          className: "toast",
                        });
                      }}
                    >
                      <FaCopy />
                    </p>
                    <a
                      href={generateWhatsAppLink(component)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IoLogoWhatsapp />
                    </a>
                    <a
                      href={generateEmailLink(component)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BiLogoGmail />
                    </a>
                  </ShareLinksWrapper>
                )}

                <Icons>
                  <Link to={`/update-snippet/${component.id}`}>
                    <MdEditSquare className="icon" />
                  </Link>

                  <div onClick={() => handleDelete(component.id)}>
                    <MdFolderDelete className="icon" />
                  </div>
                </Icons>
              </OptionsWrapper>
            </SnippetCard>
          ))
        )}
      </SnippetCardWrapper>
    </DashboardContainer>
  );
};

export default Dashboard;
