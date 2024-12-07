

const sampleComponents = [
    {
        name: "Snippet Viewer",
        description: "A component to display a list of code snippets with syntax highlighting.",
        codeSnippet: `
        import React from "react";
        import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
        import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

        const SnippetViewer = ({ snippet }) => (
            <SyntaxHighlighter language="javascript" style={darcula}>
                {snippet}
            </SyntaxHighlighter>
        );

        export default SnippetViewer;
        `,
        tags: ["React", "SyntaxHighlighter", "UI"],
        createdAt: new Date()
    },
    {
        name: "Search Bar",
        description: "A search bar component to filter snippets by tags or keywords.",
        codeSnippet: `
        import React, { useState } from "react";

        const SearchBar = ({ onSearch }) => {
            const [query, setQuery] = useState("");

            const handleSearch = () => {
                onSearch(query);
            };

            return (
                <div>
                    <input
                        type="text"
                        placeholder="Search snippets..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            );
        };

        export default SearchBar;
        `,
        tags: ["React", "Search", "UI"],
        createdAt: new Date()
    },
    {
        name: "Tag Filter",
        description: "A component to filter snippets by their tags.",
        codeSnippet: `
        import React from "react";

        const TagFilter = ({ tags, onFilter }) => (
            <div>
                {tags.map((tag) => (
                    <button key={tag} onClick={() => onFilter(tag)}>
                        {tag}
                    </button>
                ))}
            </div>
        );

        export default TagFilter;
        `,
        tags: ["React", "Filter", "UI"],
        createdAt: new Date()
    },
    {
        name: "Snippet Form",
        description: "A form to create or update a code snippet.",
        codeSnippet: `
        import React, { useState } from "react";

        const SnippetForm = ({ onSubmit }) => {
            const [name, setName] = useState("");
            const [description, setDescription] = useState("");
            const [codeSnippet, setCodeSnippet] = useState("");

            const handleSubmit = (e) => {
                e.preventDefault();
                onSubmit({ name, description, codeSnippet });
            };

            return (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Component name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <textarea
                        placeholder="Code snippet"
                        value={codeSnippet}
                        onChange={(e) => setCodeSnippet(e.target.value)}
                    />
                    <button type="submit">Save</button>
                </form>
            );
        };

        export default SnippetForm;
        `,
        tags: ["React", "Form", "UI"],
        createdAt: new Date()
    },
    {
        name: "Snippet Card",
        description: "A card component to display a snippet's metadata and code preview.",
        codeSnippet: `
        import React from "react";

        const SnippetCard = ({ name, description, snippet }) => (
            <div>
                <h3>{name}</h3>
                <p>{description}</p>
                <pre>{snippet.substring(0, 100)}...</pre>
            </div>
        );

        export default SnippetCard;
        `,
        tags: ["React", "Card", "UI"],
        createdAt: new Date()
    }
];

export { sampleComponents };
