import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useComponentContext } from "../../context/componentContext";
import { createComponent } from "../../services/ComponentService";
import {
  Container,
  Title,
  Form,
  FormGroup,
  Label,
  Input,
  Textarea,
  Button,
  ErrorMessage,
} from "./styles";

const CreateSnippet: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [codeSnippet, setCodeSnippet] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const { setComponents } = useComponentContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!name.trim()) return "Name is required!";
    if (!codeSnippet.trim()) return "Code snippet is required!";
    if (!tags.trim()) return "At least one tag is required!";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errorMsg = validateForm();
    if (errorMsg) return setError(errorMsg);

    try {
      const newSnippet = {
        name,
        description,
        codeSnippet,
        tags: tags.split(",").map((tag) => tag.trim()),
      };

      const createdSnippet = await createComponent(newSnippet);
      setComponents((prev) => [...prev, createdSnippet]);
      alert("Snippet created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating snippet:", error);
      alert("Failed to create snippet. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Create a New Snippet</Title>
      {loading && <p>Loading...</p>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name:</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Description:</Label>
          <Input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="codeSnippet">Code Snippet:</Label>
          <Textarea
            id="codeSnippet"
            value={codeSnippet}
            onChange={(e) => setCodeSnippet(e.target.value)}
            rows={10}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="tags">Tags:</Label>
          <Input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </FormGroup>
        <Button type="submit">Create Snippet</Button>
      </Form>
    </Container>
  );
};

export default CreateSnippet;
