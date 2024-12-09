import React from "react";
import { useUserContext } from "../../../context/userContext";
import { useComponentContext } from "../../../context/componentContext";
import {
  ProfileContainer,
  UserInfo,
  SnippetList,
  SnippetCard,
} from "./styles";

const Profile: React.FC = () => {
  const { currentUser } = useUserContext();
  const { components } = useComponentContext();

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <ProfileContainer>
      <UserInfo>
        <h1>Welcome, {currentUser.username}!</h1>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <p>
          <strong>Role:</strong> {currentUser.isAdmin ? "Admin" : "User"}
        </p>
      </UserInfo>

      <SnippetList>
        <h2>Your Snippets</h2>
        {components.length === 0 ? (
          <p>You haven't created any snippets yet.</p>
        ) : (
          components.map((snippet) => (
            <SnippetCard key={snippet.id}>
              <h3>{snippet.name}</h3>
              <p>{snippet.description}</p>
              <pre>{snippet.codeSnippet}</pre>
            </SnippetCard>
          ))
        )}
      </SnippetList>
    </ProfileContainer>
  );
};

export default Profile;
