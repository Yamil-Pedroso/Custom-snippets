import React, { useEffect, useState } from "react";
import { IUser, getUsers, deleteUser } from "../../services/UserService";
import { useUserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Title,
  UserTable,
  TableRow,
  TableHeader,
  TableCell,
  DeleteButton,
  StatusIndicator,
} from "./styles";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const { currentUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario es administrador
    if (!currentUser || !currentUser.isAdmin) {
      navigate("/"); // Redirige si no es administrador
      return;
    }

    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [currentUser, navigate]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        setUsers(users.filter((user) => user._id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <Container>
      <Title>User Management</Title>
      <UserTable>
        <thead>
          <TableRow>
            <TableHeader>Email</TableHeader>
            <TableHeader>Registration Date</TableHeader>
            <TableHeader>Admin</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>{user.isAdmin ? "Yes" : "No"}</TableCell>
              <TableCell>
                <StatusIndicator active={user.active} />{" "}
              </TableCell>
              <TableCell>
                <DeleteButton onClick={() => handleDelete(user._id)}>
                  Delete
                </DeleteButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </UserTable>
    </Container>
  );
};

export default UserManagement;
