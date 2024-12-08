import axios from "axios"

const API_URL = "http://localhost:3010/api/v1/components"

export interface IComponent {
    id: string;
    name: string;
    description?: string;
    codeSnippet: string;
    tags: string[];
    createdAt: string;
}

export const getComponents = async (): Promise<IComponent[]> => {
    try {
        const response = await axios.get<IComponent[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching components:", error);
        throw error;
    }
}

export const createComponent = async (component: Omit<IComponent, "id" | "createdAt">): Promise<IComponent> => {
    try {
        const response = await axios.post<IComponent>(API_URL, component);
        return response.data;
    } catch (error) {
        console.error("Error creating component:", error);
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
}

export const updateComponent = async (id: string, component: Partial<IComponent>): Promise<IComponent> => {
    try {
        const response = await axios.put<IComponent>(`${API_URL}/${id}`, component);
        return response.data;
    } catch (error) {
        console.error("Error updating component:", error);
        throw error;
    }
}

export const deleteComponent = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error("Error deleting component:", error);
        throw error;
    }
}

export const searchComponents = async (query: string): Promise<IComponent[]> => {
    try {
        const response = await axios.get<IComponent[]>(`${API_URL}/search?q=${query}`);
        return response.data;
    } catch (error) {
        console.error("Error searching components:", error);
        throw error;
    }
}
