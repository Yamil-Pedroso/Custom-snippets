import axios from "../api/axiosConfig";

const API_URL = "/auth";

export interface IUser {
    _id: string;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
    avatar: string;
    active: boolean;
    createdAt: string;
    updatedAt?: string;
}

export const getUsers = async (): Promise<IUser[]> => {
    try {
        const response = await axios.get<IUser[]>(`${API_URL}/users`);
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



export const loginUser = async (
    email: string,
    password: string
  ): Promise<{ token: string; user: IUser }> => {
    try {
      const response = await axios.post<{ token: string; user: IUser }>(
        `${API_URL}/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  export const uploadAvatar = async (avatar: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("avatar", avatar);
      const response = await axios.post<string>(`${API_URL}/upload-avatar/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error uploading avatar:", error);
      throw error;
    }
  }


export const getCurrentUser = async (): Promise<IUser> => {
    try {
      const response = await axios.get<IUser>(`${API_URL}/me`);
      return response.data;
    } catch (error) {
      console.error("Error fetching current user:", error);
      throw error;
    }
  };

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
        await axios.delete(`${API_URL}/users/${id}`);
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}

export const searchUsers = async (query: string): Promise<IUser[]> => {
    try {
        const response = await axios.get<IUser[]>(`${API_URL}/search-users?query=${query}`);
        return response.data;
    } catch (error) {
        console.error("Error searching users:", error);
        throw error;
    }
}
