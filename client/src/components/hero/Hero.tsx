import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HeroContainer,
  HeroContent,
  HeroLeft,
  HeroButton,
  RocketImageWrapper,
  RocketImage,
} from "./styles";
import images from "../../assets";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTakingOff, setIsTakingOff] = useState(false);
  const navigate = useNavigate();

  const handleHover = (hover: boolean) => {
    setIsHovered(hover); 
  };
  const handleLeave = () => {
    setIsHovered(false); 
  };

  const handleTakeOff = () => {
    setIsTakingOff(true); 

    setTimeout(() => {
      navigate("/register"); 
    }, 2000);
  };

  return (
    <HeroContainer>
      <HeroContent>
        <HeroLeft>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              textAlign: "center",
            }}
          >
            <div>
              <h1>Transform Your Ideas Into Unique Snippets</h1>
              <p
                style={{
                  fontSize: "1.3rem",
                  color: "#7680e4",
                }}
              >
                Create, share, and organize your code snippets with ease.
              </p>
            </div>
            <RocketImageWrapper>
              <RocketImage
                takeoff={isHovered || false} // Asegurarse de que tenga un valor booleano
                btnClick={isTakingOff || false}
                src={images.rocket}
                alt="Rocket"
                width="200"
              />
            </RocketImageWrapper>
          </div>
          <HeroButton
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={handleLeave}
            onClick={handleTakeOff}
          >
            Start Now
          </HeroButton>
        </HeroLeft>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
