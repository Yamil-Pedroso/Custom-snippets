import React, { useEffect, useState } from "react";
import { IUser, getUsers } from "../../services/UserService";
import { AnimatePresence } from "framer-motion";
import { useUserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import {
  Container,
  UserCardWrapper,
  UserCard,
  UserCardFooter,
  StatusIndicator,
} from "./styles";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]); // Lista completa de usuarios
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]); // Usuarios filtrados
  const [searchQuery, setSearchQuery] = useState<string>(""); // Consulta de búsqueda
  const { currentUser } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || !currentUser.isAdmin) {
      navigate("/");
      return;
    }

    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
        setFilteredUsers(data); // Inicialmente muestra todos los usuarios
        setError(null);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser, navigate]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      // Si no hay texto en el campo de búsqueda, muestra todos los usuarios
      setFilteredUsers(users);
      return;
    }

    // Filtra los usuarios por nombre o email
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredUsers(filtered);
  };

  if (loading) {
    return (
      <Container>
        <div className="loader"></div>
      </Container>
    );
  }

  return (
    <Container>
      {/* Campo de búsqueda */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          style={{
            padding: "0.5rem",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Lista de usuarios filtrados */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ marginTop: "1rem" }}>
        <AnimatePresence>
          <UserCardWrapper>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <UserCard
                  key={user._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <div className="img-wrapper">
                    <img src={user.avatar} alt="User avatar" />
                  </div>
                  <StatusIndicator active={user.active} />
                  <div className="content">
                    <p>{user.username}</p>
                    <p>
                      {user.isAdmin ? (
                        <strong style={{ color: "green" }}>Admin</strong>
                      ) : (
                        "User"
                      )}
                    </p>
                  </div>
                  <UserCardFooter>
                    <p>
                      <strong>Registration Date:</strong>{" "}
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </UserCardFooter>
                </UserCard>
              ))
            ) : (
              <p>No users found</p>
            )}
          </UserCardWrapper>
        </AnimatePresence>
      </div>
    </Container>
  );
};

export default UserManagement;
