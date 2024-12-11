import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  position: relative;

  .loader {
    width: 60px;
    height: 30px;
    display: grid;
    --c: #0000 calc(100% - 5px), #000 calc(100% - 4px) 96%, #0000;
    background: radial-gradient(farthest-side at bottom, var(--c)) 0 0,
      radial-gradient(farthest-side at top, var(--c)) 100% 100%;
    background-size: calc(50% + 2px) 50%;
    background-repeat: no-repeat;
    animation: l14 1.5s infinite linear;

    position: fixed; /* Cambiar a absolute si necesitas centrarlo dentro de un contenedor */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);


  }
  .loader:before,
  .loader:after {
    content: "";
    grid-area: 1/1;
    background: inherit;
    animation: inherit;
    animation-duration: 2s;
  }
  .loader:after {
    --s: -1;
  }
  @keyframes l14 {
    100% {
      transform: rotate(calc(var(--s, 1) * 1turn));
    }
  }
`;

export const StatusIndicator = styled.div<{ active: boolean }>`
  width: 0.9rem;
  height: 0.9rem;
  border: 1px solid #e9e9e9;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  background-color: ${({ active }) => (active ? "green" : "gray")};
  margin-right: 0.5rem;
  position: absolute;
  top: 2.2rem;
  margin-left: 5rem;
`;

export const Title = styled.h1`
  margin-bottom: 1.5rem;
  color: #333;
`;

export const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  &:nth-child(odd) {
    background-color: #f2f2f2;
    color: #333;
  }

  &:nth-child(even) {
    background-color: #333;
    color: #d3d3d3;
  }
`;

export const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  background-color: #333;
  color: white;
`;

export const TableCell = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #ddd;
`;

export const DeleteButton = styled.button`
  background-color: #f00;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: #c00;
  }
`;

export const UserCardWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  position: relative;
`;

export const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15rem;
  height: 18rem;
  background-color: #fefefe;
  border-radius: 0.4rem;
  border: 3px solid #333;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.02);
  }

  .img-wrapper {
    margin-top: 1.5rem;
    width: 6rem;
    height: 6rem;
    border: 3px solid #333;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  p:nth-child(1) {
    color: #333;
    font-weight: bold;
  }

  p:nth-child(2) {
    color: #505050;
  }

  button {
    background-color: #f00;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    margin-top: 1rem;
    &:hover {
      background-color: #c00;
    }
  }
`;

export const UserCardFooter = styled.div`
  width: 100%;
  height: 3rem;
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;

  p:first-child {
    color: white;
  }
`;
