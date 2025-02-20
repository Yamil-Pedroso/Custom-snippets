import axios from "../api/axiosConfig";
const API_URL = "/components";

export interface IComponent {
  id: string;
  name: string;
  description?: string;
  codeSnippet: string;
  tags: string[];
  category?: string;
  createdAt: string;
  isPublic: boolean;
  shareUrl: string;
}

export const getUserComponents = async (): Promise<IComponent[]> => {
  try {
    const response = await axios.get<IComponent[]>(
      `${API_URL}/user-components`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching components:", error);
    throw error;
  }
};

export const getComponents = async (): Promise<IComponent[]> => {
  try {
    const response = await axios.get<IComponent[]>(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching components:", error);
    throw error;
  }
};

export const createComponent = async (
  component: Omit<IComponent, "id" | "createdAt">
): Promise<IComponent> => {
  try {
    console.log("🛠️ Sending snippet ato backend:", component);
    const response = await axios.post<IComponent>(`${API_URL}`, component, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    console.log("✅ Snippet created:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating the snippet:", error);
    throw error;
  }
};

export const getComponentById = async (id: string): Promise<IComponent> => {
  try {
    const response = await axios.get<IComponent>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching component:", error);
    throw error;
  }
};

export const updateComponent = async (
  id: string,
  component: Partial<IComponent>
): Promise<IComponent> => {
  try {
    const response = await axios.put<IComponent>(`${API_URL}/${id}`, component);
    return response.data;
  } catch (error) {
    console.error("Error updating component:", error);
    throw error;
  }
};

export const deleteComponent = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting component:", error);
    throw error;
  }
};

export const searchComponents = async (
  query: string
): Promise<IComponent[]> => {
  try {
    const response = await axios.get<IComponent[]>(
      `${API_URL}/search?q=${query}`
    );
    return response.data;
  } catch (error) {
    console.error("Error searching components:", error);
    throw error;
  }
};

export const toggleComponentVisibility = async (
  id: string,
  isPublic: boolean
): Promise<IComponent> => {
  try {
    const response = await axios.put<IComponent>(`/components/${id}/share`, {
      isPublic,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating visibility:", error);
    throw error;
  }
};

export const getComponentsByCategory = async (
  category: string
): Promise<IComponent[]> => {
  try {
    const response = await axios.get<IComponent[]>(
      `${API_URL}/category/${category}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching components by category:", error);
    throw error;
  }
};
