import React from "react";
import { useComponentContext } from "../../../context/componentContext";
import { DashboardContainer, SnippetCard } from "./styles";

const Dashboard: React.FC = () => {
  const { components } = useComponentContext();

  return (
    <DashboardContainer>
      <h1>Your Snippets</h1>
      {components.length === 0 ? (
        <p>No snippets found.</p>
      ) : (
        components.map((component) => (
          <SnippetCard key={component.id}>
            <h3>{component.name}</h3>
            <p>{component.description}</p>
            <pre>{component.codeSnippet}</pre>
            <p>
              <strong>Tags:</strong> {component.tags.join(", ")}
            </p>
          </SnippetCard>
        ))
      )}
    </DashboardContainer>
  );
};

export default Dashboard;
