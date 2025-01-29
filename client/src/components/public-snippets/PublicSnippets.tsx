import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComponentById, IComponent } from "../../services/ComponentService";

const PublicSnippet: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Obtiene el ID de la URL
    const [component, setComponent] = useState<IComponent | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSnippet = async () => {
            try {
                const data = await getComponentById(id!); // Llama a la API
                setComponent(data);
            } catch (err) {
                console.error("Error fetching snippet:", err);
                setError("Snippet not found or private.");
            }
        };

        fetchSnippet();
    }, [id]);

    if (error) return <p>{error}</p>;
    if (!component) return <p>Loading...</p>;

    return (
        <div>
            <h2>{component.name}</h2>
            <p>{component.description}</p>
            <pre>{component.codeSnippet}</pre>
            <p><strong>Tags:</strong> {component.tags.join(", ")}</p>
        </div>
    );
};

export default PublicSnippet;
