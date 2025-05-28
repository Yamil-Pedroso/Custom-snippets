import { FeaturesContainer, FeaturesWrapper, Feature } from "./styles";
import { features } from "../../types/Types";
import { motion } from "framer-motion";

const Features = () => {
  return (
    <FeaturesContainer>
      <h2 className="text-cyan-300">Features</h2>
      <FeaturesWrapper>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
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
