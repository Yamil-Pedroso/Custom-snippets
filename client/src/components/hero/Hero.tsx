import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HeroContainer,
  HeroWrapper,
  HeroButton,
  RocketImageWrapper,
  RocketImage,
  TextWrapper,
  Content,
} from "./styles";
import images from "../../assets";
import { useUserContext } from "../../context/userContext";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false); 
  const { currentUser } = useUserContext();
  const navigate = useNavigate();

  const handleHover = () => {
    if (!isAnimating) {
      setIsHovered(true);
    }
  };

  const handleLeave = () => {
    if (!isAnimating) {
      setIsHovered(false);
    }
  };

  const handleClick = () => {
    setIsAnimating(true); 
    const destination = currentUser ? "/dashboard" : "/register";

    setTimeout(() => {
      navigate(destination);
    }, 2000); 
  };

  return (
    <HeroContainer>
      <HeroWrapper>
        <Content>
          <TextWrapper>
            <h1>Transform Your Ideas Into Unique Snippets</h1>
            <p>Create, share, and organize your code snippets with ease.</p>
          </TextWrapper>

          <RocketImageWrapper
            className={
              isAnimating
                ? "flyOutViewPort"
                : isHovered
                ? "takeoffRocket"
                : ""
            }
          >
            <RocketImage src={images.rocket} alt="Rocket" />
          </RocketImageWrapper>
        </Content>

        <div className="button-wrapper">
          <HeroButton
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            onClick={handleClick}
          >
           {currentUser ? "Go to Dashboard" : "Get Started"}
          </HeroButton>
        </div>
      </HeroWrapper>
    </HeroContainer>
  );
};

export default Hero;
