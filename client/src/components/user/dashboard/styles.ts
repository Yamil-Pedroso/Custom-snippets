import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

export const round360Icon = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(90deg);
  }
`;
interface ISnippetCardProps {
  isPublic: boolean;
}

export const DashboardContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  gap: 1rem;
  position: relative;

  h1 {
    margin-bottom: 1.5rem;
    color: #333;
  }

  p {
    color: #666;
  }
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 10%;
  min-width: 15rem;
  position: fixed;
  top: 5rem;
  left: 0;
  height: 100vh;
  background-color: white;
  padding: 1rem;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
`;

export const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CategoryDropdown = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 1rem;
  cursor: pointer;
`;

export const CategoryButton = styled.button`
  display: flex;
  gap: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem 1.5rem;
  border-radius: 3rem;
  background-color: #ffffff;
  color: #252524;
  transition: transform 0.2s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  span {
    font-size: 1.3rem;
  }

  &:hover {
    transform: scale(1.1);

    .icon {
      animation: ${round360Icon} 0.2s linear;
    }
  }
`;

export const DropdownMenu = styled(motion.ul)`
  position: absolute;
  top: 3rem;
  left: 0;
  background: #282c34;
  color: white;
  list-style: none;
  padding: 0.5rem 0;
  border-radius: 8px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  min-width: 180px;
  z-index: 1000;

  li {
    padding: 10px 15px;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: #353b45;
    }
  }
`;

export const SnippetHeader = styled.div`
  h1 {
    color: #333;
    font-size: 1.8rem;
  }

  .create {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    padding: 0.5rem 1.5rem;
    width: 12rem;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    background: linear-gradient(135deg, #e78d4d, #e78d4d);
    border: 3px solid #e78d4d;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(255, 122, 24, 0.4);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 14px rgba(255, 122, 24, 0.6);
    }

    &:active {
      transform: translateY(1px);
      box-shadow: 0 2px 5px rgba(255, 122, 24, 0.3);
    }
  }
`;

export const CategoryWrapper = styled.div`
  margin-top: 1rem;

  select {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 3rem;
    cursor: pointer;
  }
`;

export const SnippetCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.1rem;
  justify-content: center;
  margin-left: calc(200px);
  
`;

export const SnippetCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 400px;
  max-height: 40rem;
  border: 1px solid #ddd;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 1rem 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  .snippet-code {
    margin-top: 1rem;
    border-radius: 5px;
    font-size: 0.9rem;
    max-height: 18rem;
    min-height: 18rem;
  }

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

export const OptionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 1rem;
  position: relative;
`;

export const OptionButton = styled.button<ISnippetCardProps>`
  padding: 0.5rem 1rem;
  height: 2rem;
  border: 1px solid #ffffff;
  border-radius: 3rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  background-color: ${({ isPublic }) => (isPublic ? "#ffffff" : "#ffffff")};
  color: #333;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 2px 2px 0px 1px #1b1b1b;
    background-color: #ffffff;
    color: ${({ isPublic }) => (isPublic ? "#ff7226" : "#245b4f")};
    font-weight: bold;
    border: 1px solid #1b1b1b;
  }
`;

export const ShareLinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: absolute;
  bottom: 2.5rem;
  padding: 1rem;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  p {
    cursor: pointer;
    color: #333;
    transition: all 0.3s ease;
    font-weight: bold;

    &:hover {
      transform: translateY(-2px);
      color: #ff7226;
    }
  }

  a {
    color: #333;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      transform: translateY(-2px);
      color: #ff7226;
    }
  }
`;

export const Icons = styled.div`
  display: flex;
  flex-direction: column;

  .icon {
    font-size: 48px;
    cursor: pointer;
    color: #333;
    transition: transform 0.2s ease;
    border-radius: 50%;
    border: 1px solid #333;
    padding: 0.5rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: scale(1.1);
    }
  }
`;
