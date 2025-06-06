import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/UserService";
import { useUserContext } from "../../../context/userContext";
import {
  Container,
  Title,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  ErrorMessage,
} from "./styles";
import { toast } from "sonner";


const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setCurrentUser } = useUserContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token, user } = await loginUser(
        formData.email,
        formData.password
      );
      localStorage.setItem("authToken", token); 
      setCurrentUser(user); 
      toast.success("Logged in successfully", {
        className: "toast",
      });
      navigate("/dashboard"); 
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Password:</Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
         
          }}
        >
          <Button type="submit">Login</Button>
         
          <p 
            style={{ 
              color: "#ff7225", 
              cursor: "pointer", 
              fontSize: "1.2rem",
              textDecoration: "underline",
              fontWeight: "bold"

            }}
          onClick={() => navigate("/register")}> Register</p>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
