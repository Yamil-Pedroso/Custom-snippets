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
  const [isClicked, setIsClicked] = useState(false);
  const [flyOutViewPort, setFlyOutViewPort] = useState(false);
  const navigate = useNavigate();

  const handleHover = () => {
    setIsHovered((prev) => !prev);
  };

  const handleLeave = () => {
    setIsHovered(false);
  }

  const handleClick = () => {
    setIsClicked(true);
    setFlyOutViewPort(true);
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
            <RocketImageWrapper
              className={
                isHovered
                  ? "takeoffRocket"
                  : flyOutViewPort
                    ? "flyOutViewPort"
                    : isClicked
                      ? "flyOutViewPort"
                      : ""
              }
            >
              <RocketImage

                src={images.rocket}
                alt="Rocket"
                width="200"
              />
            </RocketImageWrapper>
          </div>
          <HeroButton
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            onClick={handleClick}
          >
            Start Now
          </HeroButton>
        </HeroLeft>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
