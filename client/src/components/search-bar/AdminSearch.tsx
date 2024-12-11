import React, { useState } from "react";
import { searchUsers } from "../../services/UserService";
import { IUser } from "../../services/UserService";

const AdminSearch: React.FC = () => {
    const [query, setQuery] = useState<string>("");
    const [results, setResults] = useState<IUser[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        try {
            const users = await searchUsers(query);
            setResults(users);
            setError(null);
        } catch (err) {
            setError("Failed to search users. Please try again.");
            console.error(err);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search by name or email"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {results.length > 0 ? (
                <ul>
                    {results.map((user) => (
                        <li key={user._id}>
                            {user.username} - {user.email}
                        </li>
                    ))}
                </ul>
            ) : (
                !error && <p>No results found</p>
            )}
        </div>
    );
};

export default AdminSearch;
