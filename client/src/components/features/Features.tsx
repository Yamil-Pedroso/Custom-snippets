import { FeaturesContainer, FeaturesWrapper, Feature } from "./styles";
import { features } from "../../types/Types";
import { motion } from "framer-motion";

const Features = () => {
  return (
    <FeaturesContainer>
      <h2>Features</h2>
      <FeaturesWrapper>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }} // Estado inicial
            whileInView={{ opacity: 1, y: 0 }} // Animación al entrar en el viewport
            viewport={{ once: false, amount: 0.2 }} // Ejecutar la animación solo una vez cuando esté al 20% visible
            transition={{
              duration: 0.6,
              delay: index * 0.2, // Retraso para animar secuencialmente
              ease: "easeOut",
            }}
          >
            <Feature>
              <div>
                {typeof feature.icon === "string" ? (
                  <img src={feature.icon} alt={feature.content} />
                ) : (
                  <feature.icon className="icon" />
                )}
              </div>
              <p>{feature.content}</p>
            </Feature>
          </motion.div>
        ))}
      </FeaturesWrapper>
    </FeaturesContainer>
  );
};

export default Features;
