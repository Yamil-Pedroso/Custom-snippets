import { FeaturesContainer } from "./styles";
import { RiOrganizationChart, RiGlobalLine } from "react-icons/ri";
import { MdOutlineSecurity } from "react-icons/md";

//Save snippets organized by categories.
//Support for multiple programming languages (with language icons).
//Advanced snippet search functionality.
//Share snippets with colleagues or teams.
//Syntax-highlighted editor.

const Features = () => {
  return (
    <FeaturesContainer>
      <h2>Key Features</h2>
      <div>
        <div>
          <RiOrganizationChart className="icon" />
          <p>Intuitive Organization</p>
        </div>
        <div>
          <RiGlobalLine className="icon" />
          <p>Global Sharing</p>{" "}
        </div>
        <div>
          <MdOutlineSecurity className="icon" />
          <p>Guaranteed Security</p>
        </div>

        <div>
          <p>Save snippets organized by categories.</p>
        </div>
        </div>

        <div>
        <div>
          <p>
            Support for multiple programming languages (with language icons).
          </p>
        </div>

        <div>
          <p>Advanced snippet search functionality.</p>
        </div>

        <div>
          <p>Share snippets with colleagues or teams.</p>
        </div>

        <div>
          <p>Syntax-highlighted editor.</p>
        </div>
      </div>
    </FeaturesContainer>
  );
};

export default Features;
