
import { motion } from "framer-motion";
import { DemoContainer, VideoContainer, HeaderText, NeonBorder } from "./styles";
import images from "../../assets";

const DemoSnippets = () => {
  return (
    <DemoContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <VideoContainer
        as={motion.div}
        initial={{ scale: 0.8, rotate: -5 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <NeonBorder>
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              borderRadius: "12px",
              width: "100%",
              height: "100%",
            }}
          >
            <source src={images.demoSnippets} type="video/mp4" />
            Your browser does not support the video tag
          </video>
        </NeonBorder>
      </VideoContainer>
      <HeaderText>
        <motion.h2
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Level Up Your Workflow
        </motion.h2>
        <motion.h3
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Dive into a seamless experience. Watch this demo to see how you can
          organize, search, and share your code snippets effortlessly. Let’s get
          started!
        </motion.h3>
      </HeaderText>
    </DemoContainer>
  );
};

export default DemoSnippets;
