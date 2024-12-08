import axios from "axios";

const API_URL = "http://localhost:3010/api/v1/auth";

export interface IUser {
    id: string;
    email: string;
    password: string;
    isAdmin: boolean;
    createdAt: string;
}

export const getUsers = async (): Promise<IUser[]> => {
    try {
        const response = await axios.get<IUser[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

export const registerUser = async ( user: Omit<IUser, "id" | "createdAt">): Promise<IUser> => {
    try {
        const response = await axios.post<IUser>(`${API_URL}/register`, user);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

export const loginUser = async (email: string, password: string): Promise<IUser> => {
    try {
        const response = await axios.post<IUser>(`${API_URL}/login`, { email, password });
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}

export const logoutUser = async (): Promise<void> => {
    try {
        await axios.post(`${API_URL}/logout`);
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
}

export const updateUser = async (id: string, user: Partial<IUser>): Promise<IUser> => {
    try {
        const response = await axios.put<IUser>(`${API_URL}/${id}`, user);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}

export const getUserById = async (id : string): Promise<IUser> => {
    try {
        const response = await axios.get<IUser>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
}

export const deleteUser = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}






