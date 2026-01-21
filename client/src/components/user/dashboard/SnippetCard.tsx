import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaCopy } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { BiLogoGmail } from "react-icons/bi";
import { MdEditSquare, MdFolderDelete } from "react-icons/md";
import { IComponent } from "../../../services/ComponentService";
import { MdCreateNewFolder } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import Button from "../../common/btns/Button";
import { toast } from "sonner";
import { useComponentContext } from "../../../context/componentContext";
import {
  getComponentsByCategory,
  getUserComponents,
} from "../../../services/ComponentService";

const categories = [
  "JavaScript",
  "Python",
  "CSS",
  "React",
  "Backend",
  "Database",
  "Others",
];

interface SnippetCardProps {
  components: IComponent[];
  updateVisibility: (id: string, isPublic: boolean) => void;
  handleDelete: (id: string) => void;
  generateWhatsAppLink: (component: IComponent) => string;
  generateEmailLink: (component: IComponent) => string;
}

const SnippetCard: React.FC<SnippetCardProps> = ({
  handleDelete,
  generateWhatsAppLink,
  generateEmailLink,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { components, setComponents, updateVisibility } = useComponentContext();
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

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setDropdownOpen(false);
  };

  const handleCopyLink = (component: IComponent) => {
    navigator.clipboard.writeText(component.shareUrl);
    toast.success("Link copied to clipboard");
  };

  return (
    <div className="max-w-[70rem] flex flex-wrap justify-center gap-4 max-[1024px]:gap-3">
      <div className="w-full flex justify-center gap-12 !mb-2 xl:hidden -mt-2 ">
        <Link to="/create-snippet">
          <Button
            label="Create one"
            className=" text-white font-bold bg-orange-500 border-2 border-orange-500"
            icon={<MdCreateNewFolder size={20} />}
          />
        </Link>

        <div className="mt-3 relative">
          <Button
            label="Categories"
            onMouseEnter={handleHoverToggle}
            className=" bg-white text-gray-800 shadow-md "
            icon={<BiSolidCategory size={22} className="icon" />}
          />

          {isDropdownOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1, type: "tween", ease: "easeInOut" }}
              className="absolute top-14 right-3.5  bg-gray-900 text-white rounded-lg shadow-lg z-50 min-w-[180px] p-2"
            >
              <li
                onClick={() => handleCategorySelect("")}
                className="!px-4 !py-2 cursor-pointer hover:bg-gray-700 rounded"
              >
                All Categories
              </li>
              {categories.map((category) => (
                <li
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className="!px-4 !py-2 cursor-pointer hover:bg-gray-700 rounded"
                >
                  {category}
                </li>
              ))}
            </motion.ul>
          )}
        </div>
      </div>

      {components.length === 0 ? (
        <p className="text-gray-500">No snippets found.</p>
      ) : (
        components.map((component) => {
          const isVisible = component.isPublic && component.shareUrl;
          return (
            <div
              key={component.id}
              className="w-[30rem] bg-white border-4 border-t-amber-700 rounded-lg shadow-lg flex flex-col justify-between overflow-hidden relative hover:bg-[#f5f5f5] transition-all duration-300 cursor-pointer !p-8
                         max-[1280px]:w-[22rem] max-[1280px]:!p-4"
            >
              <div className="">
                <h3 className="text-lg font-semibold text-gray-800 max-[1280px]:text-base">
                  {component.name}
                </h3>
                <p className="text-gray-700 line-clamp-2 hover:line-clamp-none transition-all duration-300 max-[1280px]:text-sm">
                  {component.description}
                </p>
                <p className="text-sm text-gray-600 max-[1280px]:text-xs">
                  <strong>Category:</strong> {component.category}
                </p>
                <div
                  className="bg-[#2a2a2a] text-[#f5f5f5] rounded-md font-mono text-sm whitespace-pre-wrap break-words h-80 overflow-y-auto !mt-4 !p-8
                                max-[1280px]:h-56 max-[1280px]:!p-4 max-[1280px]:text-xs"
                >
                  {component.codeSnippet}
                </div>
                <p className="text-sm text-gray-600 !mt-3 max-[1280px]:text-xs">
                  <strong>Tags:</strong> {component.tags.join(", ")}
                </p>
              </div>

              <div
                className="flex justify-between items-end mt-4 px-4 pb-4 relative
                              max-[1024px]:mt-3 max-[1024px]:px-2 max-[1024px]:pb-2"
              >
                <AnimatePresence mode="wait">
                  {isVisible && (
                    <motion.div
                      key={component.id + "-share"}
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{
                        duration: 0.4,
                        type: "tween",
                        ease: "easeInOut",
                      }}
                      className="w-6 flex top-2.5 bg-white p-4 rounded-lg shadow-lg gap-3 absolute
                                 max-[1024px]:p-3 max-[1024px]:gap-2"
                    >
                      <p
                        onClick={() => handleCopyLink(component)}
                        className="cursor-pointer font-bold text-gray-800 hover:text-orange-500"
                      >
                        <FaCopy />
                      </p>
                      <a
                        href={generateWhatsAppLink(component)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-800 hover:text-orange-500"
                      >
                        <IoLogoWhatsapp />
                      </a>
                      <a
                        href={generateEmailLink(component)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-800 hover:text-orange-500"
                      >
                        <BiLogoGmail />
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
                <button
                  onClick={() =>
                    updateVisibility(component.id, !component.isPublic)
                  }
                  className="!px-4 py-1 border border-[#6b6b6b] rounded-full shadow hover:translate-y-[-2px] hover:shadow-lg transition cursor-pointer
                             max-[1024px]:!px-3 max-[1024px]:text-sm"
                >
                  {component.isPublic ? (
                    <div className="text-orange-600">Make Private</div>
                  ) : (
                    <div className="text-emerald-700">Make Public</div>
                  )}
                </button>

                <div className="flex flex-col gap-2">
                  <Link to={`/update-snippet/${component.id}`}>
                    <MdEditSquare className="text-3xl text-gray-800 border p-2 rounded-full shadow hover:scale-110 transition cursor-pointer max-[1024px]:text-2xl" />
                  </Link>
                  <div onClick={() => handleDelete(component.id)}>
                    <MdFolderDelete className="text-3xl text-gray-800 border p-2 rounded-full shadow hover:scale-110 transition cursor-pointer max-[1024px]:text-2xl" />
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default SnippetCard;
