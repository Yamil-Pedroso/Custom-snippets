import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useComponentContext } from "../../context/componentContext";
import { createComponent } from "../../services/ComponentService";

const CreateSnippet: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [codeSnippet, setCodeSnippet] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const { setComponents } = useComponentContext(); // Usar contexto para actualizar la lista
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const inputStyle = {
    margin: "10px 0",
    padding: "8px",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    padding: "10px 20px",
    marginTop: "20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      return alert("Name is required!");
    }
    if (!codeSnippet.trim()) {
      return alert("Code snippet is required!");
    }
    if (!tags.trim()) {
      return alert("At least one tag is required!");
    }

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
    <div style={{ padding: "20px" }}>
      {loading ? <p>Loading...</p> : null}
      <h1>Create a New Snippet</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="codeSnippet">Code Snippet:</label>
          <textarea
            id="codeSnippet"
            value={codeSnippet}
            onChange={(e) => setCodeSnippet(e.target.value)}
            rows={10}
            style={{ ...inputStyle, height: "150px" }}
          />
        </div>
        <div>
          <label htmlFor="tags">Tags:</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Create Snippet
        </button>
      </form>
    </div>
  );
};

export default CreateSnippet;
