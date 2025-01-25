import { useState } from "react";
import { WelcomeMessageContainer, BtnWrapper } from "./styles";
import { IoIosClose } from "react-icons/io";
import { motion } from "framer-motion";

const WelcomeMessage = () => {
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

  if (!showWelcomeMessage) return null;

  const handleClose = () => {
    setShowWelcomeMessage(false);
  };

  return (
    <WelcomeMessageContainer
        as={motion.div}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
      <h2>Welcome to Snippet</h2>
      <p>Create, share, and organize your code snippets with ease.</p>

      <BtnWrapper>
        <button>Sign up with email</button>
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
  );
};

export default WelcomeMessage;
