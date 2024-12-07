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
