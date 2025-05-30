import styled from "styled-components";

export const ProfileContainer = styled.div`
  padding: 2rem;
  max-width: 900px;
  margin: 2rem auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`;

export const UserInfo = styled.div`
  margin-bottom: 2rem;

  h1 {
    margin-bottom: 0.5rem;
    color: #333;
  }

  p {
    color: #555;
    margin: 0.5rem 0;
    strong {
      color: #000;
    }
  }
`;

export const AvatarWrapper = styled.div`
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    border: 3px solid #333;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
     object-fit: cover;
    }
`;

export const SnippetList = styled.div`
  h2 {
    margin-bottom: 1rem;
    color: #333;
  }

  p {
    color: #777;
  }
`;

export const SnippetCard = styled.div`
  border: 1px solid #ddd;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  background-color: #f9f9f9;

  h3 {
    margin-bottom: 0.5rem;
    color: #222;
  }

  p {
    color: #444;
    margin-bottom: 0.5rem;
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
`;

export const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StatusCircle = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "green" : "red")};
`;
