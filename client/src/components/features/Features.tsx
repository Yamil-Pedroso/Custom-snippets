import { FeaturesContainer } from "./styles";
import { RiOrganizationChart, RiGlobalLine } from "react-icons/ri";
import { MdOutlineSecurity } from "react-icons/md";

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
      </div>
    </FeaturesContainer>
  );
};

export default Features;
