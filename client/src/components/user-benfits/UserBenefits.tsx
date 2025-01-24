import { UserBenefitsContainer, HeaderText } from "./styles";

//Save time searching for reusable code.
//Organize your knowledge as a developer.
//Facilitate teamwork by sharing snippets.

const UserBenefits: React.FC = () => {
  return (
    <UserBenefitsContainer>
      <div>
        <HeaderText>
          <h2>Why use this app?</h2>
        </HeaderText>
        <div style={{ display: "flex", gap: "1rem" }}>
          <p>Save time searching for reusable code.</p>
          <p>Organize your knowledge as a developer.</p>
          <p>Facilitate teamwork by sharing snippets.</p>
        </div>
      </div>
    </UserBenefitsContainer>
  );
};

export default UserBenefits;
