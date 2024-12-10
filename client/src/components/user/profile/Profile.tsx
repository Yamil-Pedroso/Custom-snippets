import React from "react";
import { useUserContext } from "../../../context/userContext";
import { useComponentContext } from "../../../context/componentContext";
import {
  ProfileContainer,
  UserInfo,
  SnippetList,
  SnippetCard,
  AvatarWrapper,
  StatusCircle,
  StatusWrapper,
} from "./styles";

const Profile: React.FC = () => {
  const { currentUser } = useUserContext();
  const { components } = useComponentContext();

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  const lastSnippet =
  components.length > 0
    ? components.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
    : null;

  return (
    <ProfileContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <UserInfo>
          <h1>Welcome, {currentUser.username}!</h1>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <p>
            <strong>Role:</strong> {currentUser.isAdmin ? "Admin" : "User"}
          </p>

          <p>
            <strong>Snippets Created:</strong> {components.length}
          </p>

          <p>
            <strong>Joined:</strong>{" "}
            {new Date(currentUser.createdAt).toLocaleDateString()}
          </p>

          <StatusWrapper>
            <p>
              <strong>Status:</strong>
            </p>
            <StatusCircle active={currentUser.active}>
              {currentUser.active}
            </StatusCircle>
          </StatusWrapper>
        </UserInfo>

        <AvatarWrapper>
          <img src={currentUser?.avatar} alt="User avatar" />
        </AvatarWrapper>
      </div>

      <SnippetList>
        <h2>Your Last Snippet</h2>
        {lastSnippet ? (
          <SnippetCard key={lastSnippet.id}>
            <h3>{lastSnippet.name}</h3>
            <p>{lastSnippet.description || "No description provided."}</p>
            <pre>{lastSnippet.codeSnippet}</pre>
            <p>
              <strong>Tags:</strong> {lastSnippet.tags.join(", ")}
            </p>
          </SnippetCard>
        ) : (
          <p>You haven't created any snippets yet.</p>
        )}
      </SnippetList>
    </ProfileContainer>
  );
};

export default Profile;
