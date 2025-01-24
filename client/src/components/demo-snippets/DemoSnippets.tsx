import { DemoContainer, HeaderText } from "./styles";
import images from "../../assets";

const DemoSnippets = () => {
  return (
    <DemoContainer>
      <video className="w-full" autoPlay loop muted playsInline controls
        style={{borderRadius: "8px", width: "15rem"}}
      >
        <source src={images.demoSnippets} type="video/mp4" />
        Your browser does not support the video tag
      </video>
      <HeaderText>
        <h2>Highlight the Experience</h2>
        <h3>
          See how easy it is to organize, search, and share your code snippets
          in just a few clicks. Watch this quick demo to explore the main
          features of our app.
        </h3>
      </HeaderText>
    </DemoContainer>
  );
};

export default DemoSnippets;
