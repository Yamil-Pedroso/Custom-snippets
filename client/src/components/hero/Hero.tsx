import { useNavigate } from "react-router-dom";
import {
  HeroContainer,
  HeroContent,
  HeroLeft,
  HeroButton,
  RocketImage,
} from "./styles";
import images from "../../assets";

const Hero = () => {
  const navigate = useNavigate();
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
              >Create, share, and organize your code snippets with ease.</p>
            </div>
            <div>
              <RocketImage
                src={images.rocket}
                alt="Rocket"
                width="200"
              />
            </div>
          </div>
          <HeroButton onClick={() => navigate("/register")}>
            Start Now
          </HeroButton>
        </HeroLeft>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
