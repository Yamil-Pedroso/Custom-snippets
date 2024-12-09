import { useState } from "react";
import { Link } from "react-router-dom";
//import { useComponentContext } from '../../context/componentContext';

interface INavbarProps {
  isLogged?: boolean;
}

const Navbar: React.FC<INavbarProps> = () => {
  const [simulateAuthUser, setSimulateAuthUser] = useState(false);
  //let { isSimulateAuthUser } = useComponentContext();

  const handleLogout = () => {
    setSimulateAuthUser(false);
  };

  return (
    <div>
      {simulateAuthUser ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "3rem",
          }}
        >
          <button
            style={{
              marginTop: "1rem",
              cursor: "pointer",
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
          <ul
            style={{
              display: "flex",
              justifyContent: "center",
              listStyleType: "none",
              marginTop: "1rem",
              gap: "1rem",
              cursor: "pointer",
            }}
          >
            <li>Profile</li>
            <li>Dashboard</li>
          </ul>

          <h2
            style={{
              marginTop: "1rem",
            }}
          >
            Welcome User
          </h2>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "3rem",
          }}
        >
          <h2>Welcome Guest</h2>
          <div
            style={{ display: "flex", justifyContent: "center" }}
          >
            <ul
              style={{
                display: "flex",
                justifyContent: "center",
                listStyleType: "none",
                marginTop: "1rem",
                color: "#fff",
                gap: "1rem",
                cursor: "pointer",
              }}
            >
              <Link to="/register">
                <li
                  style={{
                    color: "#fff",
                  }}
                >
                  Register</li>
              </Link>
              <Link to="/login">
                <li
                  style={{
                    color: "#fff",
                  }}
                >Login</li>
              </Link>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
