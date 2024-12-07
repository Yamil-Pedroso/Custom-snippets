import { Request, Response, NextFunction } from "express";
import { User, IUser } from "../models/User";
import cookieToken from "../utils/cookieTokens";
import CustomError from "../utils/customError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            throw new CustomError('Please fill in all fields', 400);
        }

        let user = await User.findOne({ email });

        if (user) {
            throw new CustomError('User already exists', 400);
        }
        user = new User ({
            username,
            email,
            password,
        });

        user = await User.create(user);

        cookieToken(user, res);

    } catch (error: any) {
        next(new CustomError(error.message, 500));
    }
};

export const loginUser = async (req: any, res: any, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

       
        return cookieToken(user, res);
    } catch (error) {
        return next(new CustomError("Error logging in", 500));
    }
};

// Logout user
export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.cookie('token', null, {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
        res.status(200).json({ success: true, data: {} });
    } catch (error: any) {
        next(new CustomError(error.message, 500));
    }
};

// Google Login (placeholder para OAuth 2.0)
//export const googleLogin = async (req: Request, res: Response) => {
//    const { tokenId } = req.body;
//
//    try {
//        // Aquí validarías el `tokenId` con Google
//        // Por ejemplo, usando la biblioteca oficial de Google o una librería JWT para decodificar el token
//        const userData = {}; // Simula obtener datos del usuario de Google
//
//        // Crear o buscar al usuario en tu base de datos
//        let user = await User.findOne({ email: userData.email });
//        if (!user) {
//            user = new User({
//                username: userData.name,
//                email: userData.email,
//                avatar: userData.picture,
//                password: "google_oauth", // Contraseña ficticia
//            });
//            await user.save();
//        }
//
//        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "1d" });
//
//        res.status(200).json({
//            message: "Google login successful",
//            token,
//            user: { id: user._id, username: user.username, email: user.email, avatar: user.avatar },
//        });
//    } catch (error) {
//        res.status(500).json({ message: "Error logging in with Google", error });
//    }
//};

// Actualizar avatar
//export const updateAvatar = async (req: Request, res: Response) => {
//    const { id } = req.params;
//    const { avatar } = req.body;
//
//    try {
//        const user = await User.findByIdAndUpdate(id, { avatar }, { new: true });
//        if (!user) {
//            return res.status(404).json({ message: "User not found" });
//        }
//
//        res.status(200).json({ message: "Avatar updated", user });
//    } catch (error) {
//        res.status(500).json({ message: "Error updating avatar", error });
//    }
//};

// Actualizar información del usuario
export const updateUser = async (req: any, res: any, next: NextFunction) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const updatedUser = await User.findByIdAndUpdate(id, {
            username,
            email,
            password: hashedPassword,
        }, { new: true });

        return cookieToken(updatedUser, res);
    } catch (error) {
        return next(new CustomError("Error updating user", 500));
    }
};

export const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        next(new CustomError("Error getting users", 500));
    }
};

// Eliminar usuario
export const deleteUser = async (req: any, res: any, next: NextFunction) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        next(new CustomError("Error deleting user", 500));
    }
};


