import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useComponentContext } from "../../../context/componentContext";
import {
  deleteComponent,
  getComponentsByCategory,
  getUserComponents,
  IComponent,
} from "../../../services/ComponentService";
import { MdCreateNewFolder } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { motion } from "framer-motion";
import { toast } from "sonner";
import SnippetCard from "./SnippetCard";

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

  const handleHoverToggle = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        if (selectedCategory === "") {
          const data = await getUserComponents();
          setComponents(data);
        } else {
          const data = await getComponentsByCategory(selectedCategory);
          setComponents(data);
        }
      } catch (error) {
        console.error("Error fetching components:", error);
      }
    };

    fetchComponents();
  }, [selectedCategory, setComponents]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this snippet?")) {
      try {
        await deleteComponent(id);
        setComponents((prev) => prev.filter((c) => c.id !== id));
        toast.success("Snippet deleted successfully");
      } catch (error) {
        console.error("Error deleting snippet:", error);
        alert("Failed to delete snippet. Please try again.");
      }
    }
  };

  const generateWhatsAppLink = (component: IComponent) => {
    const msg = `Hi,%0A%0AI want to share this snippet with you:%0A%0A${component.name}%0A%0A${component.codeSnippet}%0A%0AOpen it: ${component.shareUrl}`;
    return `https://wa.me/?text=${msg}`;
  };

  const generateEmailLink = (component: IComponent) => {
    const subject = `Snippet Shared: ${component.name}`;
    const body = `Hi,%0A%0AI want to share this snippet with you:%0A%0A${component.name}%0A%0A${component.codeSnippet}%0A%0AOpen it: ${component.shareUrl}`;
    return `mailto:?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (
        !(e.target instanceof Element && e.target.closest(".category-dropdown"))
      )
        setDropdownOpen(false);
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <div className="flex justify-center gap-4 p-16 bg-white rounded-lg shadow-md relative">
      <aside className="flex flex-col gap-4 w-[15rem] fixed top-20 left-0 h-screen bg-white p-4 shadow-md">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        </header>
        <div className="flex flex-col gap-4">
          <Link
            to="/create-snippet"
            className="flex items-center justify-between px-6 py-2 w-48 font-bold text-white bg-orange-500 border-2 border-orange-500 rounded-full shadow-md hover:-translate-y-1 hover:shadow-lg transition"
          >
            Create one <MdCreateNewFolder size={24} />
          </Link>

          <div className="relative category-dropdown">
            <button
              onMouseEnter={handleHoverToggle}
              className="flex items-center gap-2 text-lg px-4 py-2 rounded-full bg-white text-gray-800 shadow-md hover:scale-105 transition"
            >
              <span>Categories</span>
              <BiSolidCategory size={22} className="icon" />
            </button>

            {isDropdownOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1, type: "tween", ease: "easeInOut" }}
                className="absolute top-12 left-0 bg-gray-900 text-white rounded-lg shadow-lg z-50 min-w-[180px] p-2"
              >
                <li
                  onClick={() => handleCategorySelect("")}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-700 rounded"
                >
                  All Categories
                </li>
                {categories.map((category) => (
                  <li
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-700 rounded"
                  >
                    {category}
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
        </div>
      </aside>

      <div className="ml-[15rem] w-full">
        <SnippetCard
          components={components}
          updateVisibility={updateVisibility}
          handleDelete={handleDelete}
          generateWhatsAppLink={generateWhatsAppLink}
          generateEmailLink={generateEmailLink}
        />
      </div>
    </div>
  );
};

export default Dashboard;
