import styled from "styled-components";

export const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 2rem auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    margin-bottom: 1.5rem;
    color: #333;
  }

  p {
    color: #666;
  }
`;

export const SnippetCard = styled.div`
  border: 1px solid #ddd;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  background-color: #f9f9f9;

  h3 {
    margin-bottom: 0.75rem;
    color: #222;
  }

  p {
    margin-bottom: 0.5rem;
    color: #444;
  }

  pre {
    background: #333;
    color: #fff;
    padding: 1rem;
    border-radius: 5px;
    overflow-x: auto;
    font-family: "Courier New", Courier, monospace;
    font-size: 0.9rem;
  }

  strong {
    color: #000;
  }
`;
