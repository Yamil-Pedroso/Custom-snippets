import {
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalText,
  CloseButton,
} from "./styles";
import { motion } from "framer-motion";
import images from "../../../assets";

interface ModalMessageProps {
  onClose: () => void;
}

const ModalMessage = ({ onClose }: ModalMessageProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 3, duration: 0.5 }}
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
    }}
  >
    <ModalOverlay as={motion.div} onClick={onClose}>
      {" "}
      {/* Detecta clics fuera del modal */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1.3, opacity: 1 }}
        transition={{
          delay: 3,
          type: "spring",
          stiffness: 300,
          damping: 15,
          mass: 0.8,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalContent>
          <ModalTitle>
            <img src={images.charFront} alt="Waving Hand" />
            <p>Hi guys!</p>
          </ModalTitle>
          <ModalText>
            Welcome! 👋 In this Snippet Collection Project (and a bit more...😎), I’ve
            completed some features, while others are still in dev. Feel
            free to register with a random email (name@example.com) if you’d
            like to look around. And give me an interesting profile picture (just kidding😅)! 😉
          </ModalText>
          <CloseButton onClick={onClose}>Close</CloseButton>
        </ModalContent>
      </motion.div>
    </ModalOverlay>
  </motion.div>
);

export default ModalMessage;
