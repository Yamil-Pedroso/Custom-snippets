import React from "react";
import { motion } from "framer-motion";
import {
  UserBenefitsContainer,
  HeaderText,
  BenefitList,
  BenefitItem,
} from "./styles";
import { FaClock, FaFolderOpen, FaUsers } from "react-icons/fa";

const UserBenefits: React.FC = () => {
  return (
    <UserBenefitsContainer>
      <HeaderText
        as={motion.div}
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2>Why use this app?</h2>
      </HeaderText>
      <BenefitList>
        {[{ icon: FaClock, text: "Save time searching for reusable code." },
          { icon: FaFolderOpen, text: "Organize your knowledge as a developer." },
          { icon: FaUsers, text: "Facilitate teamwork by sharing snippets." }].map((benefit, index) => (
          <BenefitItem
            as={motion.div}
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} // Alterna entre deslizar desde la izquierda y la derecha
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2, // Retraso secuencial para cada elemento
              ease: "easeOut",
            }}
          >
            <benefit.icon size={30} color="#ff7225" />
            <p>{benefit.text}</p>
          </BenefitItem>
        ))}
      </BenefitList>
    </UserBenefitsContainer>
  );
};

export default UserBenefits;
