import { useNavigate } from "react-router-dom"
import { HeroContainer, HeroContent, HeroLeft, HeroRight } from "./styles"
import images from "../../assets"

const Hero = () => {
    const navigate = useNavigate()
  return (
    <HeroContainer>
      <HeroContent>
        <HeroLeft>
        <h1>Transform your ideas into Unique Snippets</h1>
        <p>Create, share and organize your code snippets with ease.</p>
        <button onClick={() => navigate("/register")}>Empieza Ahora</button>
        </HeroLeft>
        <HeroRight>
          <h1>Start Now</h1>
            
        </HeroRight>
      </HeroContent>
    </HeroContainer>
  )
}

export default Hero