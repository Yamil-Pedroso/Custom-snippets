import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { registerUser } from "../../../services/UserService";
import axios from "axios";
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
import Confetti from "react-confetti";
import { toast } from "sonner";

const Register: React.FC = () => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setAvatar(file);
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }
  
    if (!avatar) {
      setError("Please upload an avatar");
      return;
    }
  
    try {
      // Crea un FormData para enviar los datos
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("isAdmin", "false");
      formDataToSend.append("avatar", avatar); // Adjunta el archivo del avatar
  
      // Envía los datos al backend
      await axios.post("/auth/register", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Limpia el formulario y muestra el confetti
      setFormData({ username: "", email: "", password: "" });
      setAvatar(null); 
      setShowConfetti(true);
      toast.success(
        "User registered successfully. Redirecting to login page...",
        {
          className: "toast",
        }
      );
      setError(null);
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (err) {
      setError("Error registering user. Please try again.");
      console.error(err);
    }
  };
  

  return (
    <Container>
      {showConfetti && <Confetti />}
      <Title>Register</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Username:</Label>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </FormGroup>
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
        <FormGroup>
          <Label>Avatar:</Label>
          <Input
            type="file"
            name="avatar"
            onChange={(e) => handleFileChange(e)}
            accept="image/*"
          />
        </FormGroup>
   
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          
          }}
        >
        <Button type="submit">Register</Button>
        <p 
          style={{ 
            color: "#ff7225", 
            cursor: "pointer", 
            fontSize: "1.2rem",
            textDecoration: "underline",
            fontWeight: "bold"

          }}
        onClick={() => navigate("/login")}> Login</p>
      </div>
      </Form>
    </Container>
  );
};

export default Register;
