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
  UserCard,
  UserCardWrapper,
  UserCardFooter,
} from "./styles";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const { currentUser } = useUserContext();
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <Container>
        <div className="loader"></div>
      </Container>
    )
  }

  return (
    <Container>

     {/* <UserTable>
        <thead>
          <TableRow>
            <TableHeader>Email</TableHeader>
            <TableHeader>Registration Date</TableHeader>
            <TableHeader>Admin</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Actions</TableHeader>
            <TableHeader>Avatar</TableHeader>
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

              <TableCell>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={user.avatar}
                    alt="User avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </UserTable> */}

      <UserCardWrapper>
        {users.map((user) => (
          <UserCard key={user._id}>
            <div className="img-wrapper">
              <img src={user.avatar} alt="User avatar" />
            </div>
              <StatusIndicator active={user.active} />
            <div className="content">
              <p>{user.email}</p>
              <p>{user.isAdmin ? <strong style={{ color: "green" }}>Admin</strong> : "User"}</p>
              <button onClick={() => handleDelete(user._id)}>Delete</button>
            </div>

            <UserCardFooter>
              <p>
                <strong>Registration Date:</strong>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </UserCardFooter>
          </UserCard>
        ))}
      </UserCardWrapper>
    </Container>
  );
};

export default UserManagement;
