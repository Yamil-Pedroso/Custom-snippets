import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
`;

export const StatusIndicator = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "green" : "gray")};
  margin-right: 0.5rem;
`;

export const Title = styled.h1`
  margin-bottom: 1.5rem;
`;

export const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
    color: #333;
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
