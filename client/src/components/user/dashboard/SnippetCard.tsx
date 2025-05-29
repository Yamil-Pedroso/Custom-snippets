import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaCopy } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { BiLogoGmail } from "react-icons/bi";
import { MdEditSquare, MdFolderDelete } from "react-icons/md";
import { IComponent } from "../../../services/ComponentService";

interface SnippetCardProps {
  components: IComponent[];
  updateVisibility: (id: string, isPublic: boolean) => void;
  handleDelete: (id: string) => void;
  generateWhatsAppLink: (component: IComponent) => string;
  generateEmailLink: (component: IComponent) => string;
}

const SnippetCard: React.FC<SnippetCardProps> = ({
  components,
  updateVisibility,
  handleDelete,
  generateWhatsAppLink,
  generateEmailLink,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {components.length === 0 ? (
        <p className="text-gray-500">No snippets found.</p>
      ) : (
        components.map((component) => {
          const isVisible = component.isPublic && component.shareUrl;
          return (
            <div
              key={component.id}
              className="w-[25rem] border-4 border-blue-500 bg-white rounded-lg shadow-md p-[6rem] flex flex-col justify-between  overflow-hidden relative hover:bg-[#f5f5f5] transition-all duration-300 cursor-pointer"
            >
              <div className="">
                <h3 className="text-lg font-semibold text-gray-800">
                  {component.name}
                </h3>
                <p className="text-gray-700">{component.description}</p>
                <p className="text-sm text-gray-600">
                  <strong>Category:</strong> {component.category}
                </p>
                <div className="bg-[#2a2a2a] text-[#f5f5f5] p-4 rounded-md font-mono text-sm whitespace-pre-wrap break-words h-80 overflow-y-auto">
                  {component.codeSnippet}
                </div>
                <p className="text-sm text-gray-600">
                  <strong>Tags:</strong> {component.tags.join(", ")}
                </p>
              </div>

              <div className="flex justify-between items-end mt-4 relative">
                <button
                  onClick={() =>
                    updateVisibility(component.id, !component.isPublic)
                  }
                  className="px-4 py-1 border border-[#6b6b6b] rounded-full shadow hover:translate-y-[-2px] hover:shadow-lg transition cursor-pointer"
                >
                  {component.isPublic ? (
                    <div className="text-orange-600">Make Private</div>
                  ) : (
                    <div className="text-emerald-700">Make Public</div>
                  )}
                </button>

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
                      className="absolute bottom-10 bg-white p-4 rounded-lg shadow-lg flex flex-col gap-3"
                    >
                      <p
                        onClick={() => {
                          navigator.clipboard.writeText(component.shareUrl);
                          // toast
                        }}
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

                <div className="flex flex-col gap-2">
                  <Link to={`/update-snippet/${component.id}`}>
                    <MdEditSquare className="text-3xl text-gray-800 border p-2 rounded-full shadow hover:scale-110 transition cursor-pointer" />
                  </Link>
                  <div onClick={() => handleDelete(component.id)}>
                    <MdFolderDelete className="text-3xl text-gray-800 border p-2 rounded-full shadow hover:scale-110 transition cursor-pointer" />
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
