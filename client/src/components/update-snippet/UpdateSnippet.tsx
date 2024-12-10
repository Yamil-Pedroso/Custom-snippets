import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useComponentContext } from "../../context/componentContext";
import { updateComponent, getComponentById } from "../../services/ComponentService";

const UpdateSnippet: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Obtenemos el ID desde la URL
    const { setComponents } = useComponentContext();
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [codeSnippet, setCodeSnippet] = useState<string>("");
    const [tags, setTags] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    // Cargar datos del snippet al montar el componente
    useEffect(() => {
        const fetchSnippet = async () => {
            setLoading(true);
            if (id) {
                try {
                    const snippet = await getComponentById(id);
                    setName(snippet.name);
                    setDescription(snippet.description || "");
                    setCodeSnippet(snippet.codeSnippet);
                    setTags(snippet.tags.join(", "));
                } catch (error) {
                    console.error("Error fetching snippet:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        if (id) fetchSnippet();
    }, [id]);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
          e.preventDefault();
          // Esto es necesario para que algunos navegadores muestren un mensaje de advertencia
          e.returnValue = ""; // Algunos navegadores requieren esta línea, aunque está "deprecated".
        };
      
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
      }, [name, description, codeSnippet, tags]);
      
      

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!id) return;

        try {
            const updatedSnippet = {
                name,
                description,
                codeSnippet,
                tags: tags.split(",").map((tag) => tag.trim()),
            };

            const response = await updateComponent(id, updatedSnippet);
            setComponents((prev) =>
                prev.map((component) => (component.id === id ? response : component))
            );

            alert("Snippet updated successfully!");
            navigate("/"); // Navega de regreso a la lista
        } catch (error) {
            console.error("Error updating snippet:", error);
            alert("Failed to update snippet. Please try again.");
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Update Snippet</h1>
            {loading ? <p>Loading...</p> :

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label htmlFor="name" style={styles.label}>Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="description" style={styles.label}>Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            style={styles.textarea}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="codeSnippet" style={styles.label}>Code Snippet:</label>
                        <textarea
                            id="codeSnippet"
                            value={codeSnippet}
                            onChange={(e) => setCodeSnippet(e.target.value)}
                            rows={10}
                            style={styles.textarea}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="tags" style={styles.label}>Tags:</label>
                        <input
                            type="text"
                            id="tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    <button type="submit" style={styles.button} disabled={loading}>
                       {loading ? "Updating..." : "Update Snippet"}
                    </button>
                </form>
            }
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    container: {
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    heading: {
        textAlign: "center",
        marginBottom: "20px",
        color: "#333",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    formGroup: {
        display: "flex",
        flexDirection: "column",
    },
    label: {
        marginBottom: "5px",
        fontWeight: "bold",
        color: "#555",
    },
    input: {
        padding: "10px",
        fontSize: "16px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        outline: "none",
    },
    textarea: {
        padding: "10px",
        fontSize: "16px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        outline: "none",
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        color: "#fff",
        backgroundColor: "#4b692a",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        alignSelf: "center",
    },
};

export default UpdateSnippet;
