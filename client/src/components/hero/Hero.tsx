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

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [flyOutViewPort, setFlyOutViewPort] = useState(false);
  const navigate = useNavigate();

  const handleHover = () => {
    if (!isClicked) {
      setIsHovered(true);
    }
  };

  const handleLeave = () => {
    if (!isClicked) {
      setIsHovered(false);
    }
  };

  const handleClick = () => {
    setIsClicked(true);
    setFlyOutViewPort(true);
    setTimeout(() => {
      navigate("/register");
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
              flyOutViewPort
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
            Start Now
          </HeroButton>
        </div>
      </HeroWrapper>
    </HeroContainer>
  );
};

export default Hero;
