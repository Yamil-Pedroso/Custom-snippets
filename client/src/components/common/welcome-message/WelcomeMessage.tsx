import { useState, useEffect } from "react";
import { WelcomeMessageContainer, BtnWrapper } from "./styles";
import { IoIosClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useUserContext } from "../../../context/userContext";
import { Link } from "react-router-dom";

const WelcomeMessage = () => {
  const { currentUser, loading } = useUserContext();
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  useEffect(() => {
    if (!currentUser && !loading) {
      setShowWelcomeMessage(true);
    }
  }, [currentUser, loading]);

  const handleClose = () => {
    setShowWelcomeMessage(false);
  };

  if (loading) {
    return null;
  }

  if (currentUser) {
    return null;
  }

  return (
    <AnimatePresence>
      {showWelcomeMessage && (
        <WelcomeMessageContainer
          as={motion.div}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 1.5, type: "tween", ease: "easeInOut" }}
        >
          <h2>Welcome to Snippet</h2>
          <p>Create, share, and organize your code snippets with ease.</p>

          <BtnWrapper>
            <Link to="/register">
              <button>Sign up with email</button>
            </Link>
          </BtnWrapper>

          <IoIosClose
            onClick={handleClose}
            style={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              color: "#9E9EA7",
              cursor: "pointer",
            }}
            size={24}
          />
        </WelcomeMessageContainer>
      )}
    </AnimatePresence>
  );
};

export default WelcomeMessage;
