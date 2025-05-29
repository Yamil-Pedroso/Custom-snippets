import React from "react";
import { useUserContext } from "../../../context/userContext";
import { useComponentContext } from "../../../context/componentContext";

const Profile: React.FC = () => {
  const { currentUser } = useUserContext();
  const { components } = useComponentContext();

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  const lastSnippet =
    components.length > 0
      ? components
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )[0]
      : null;

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md relative">
      <div className="flex justify-between items-center mb-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome, {currentUser.username}!
          </h1>
          <p className="text-gray-700 mb-1">
            <strong className="text-black">Email:</strong> {currentUser.email}
          </p>
          <p className="text-gray-700 mb-1">
            <strong className="text-black">Role:</strong>{" "}
            {currentUser.isAdmin ? "Admin" : "User"}
          </p>
          <p className="text-gray-700 mb-1">
            <strong className="text-black">Snippets Created:</strong>{" "}
            {components.length}
          </p>
          <p className="text-gray-700 mb-4">
            <strong className="text-black">Joined:</strong>{" "}
            {new Date(currentUser.createdAt).toLocaleDateString()}
          </p>

          <div className="flex items-center gap-2">
            <p className="text-gray-700">
              <strong className="text-black">Status:</strong>
            </p>
            <div
              className={`w-3 h-3 rounded-full ${
                currentUser.active ? "bg-green-500" : "bg-red-500"
              }`}
            />
          </div>
        </div>

        <div className="w-40 h-40 rounded-full border-4 border-gray-800 overflow-hidden">
          <img
            src={currentUser?.avatar}
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Your Last Snippet
        </h2>
        {lastSnippet ? (
          <div className="border border-gray-300 p-6 mb-4 rounded-lg bg-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {lastSnippet.name}
            </h3>
            <p className="text-gray-700 mb-2">
              {lastSnippet.description || "No description provided."}
            </p>
            <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto font-mono text-sm mb-2">
              {lastSnippet.codeSnippet}
            </pre>
            <p className="text-gray-600">
              <strong className="text-black">Tags:</strong>{" "}
              {lastSnippet.tags.join(", ")}
            </p>
          </div>
        ) : (
          <p className="text-gray-600">You haven't created any snippets yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
