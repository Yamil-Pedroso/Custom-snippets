import { Request, Response, NextFunction } from "express";
import { User, IUser } from "../models/User";
import cookieToken from "../utils/cookieTokens";
import CustomError from "../utils/customError";
import { v2 as cloudinary } from 'cloudinary';
import { UploadedFile } from 'express-fileupload';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password, isAdmin } = req.body;

        if (!username || !email || !password) {
            throw new CustomError('Please fill in all fields', 400);
        }

        let user = await User.findOne({ email });

        if (user) {
            throw new CustomError('User already exists', 400);
        }

        let myAvatar = 'https://res.cloudinary.com/ddgf7ijdc/image/upload/v1709338082/userAvatart/Avatars/ez5hjkxgtf0mcnjytx0c.jpg';
        if (req.file) {

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'userAvatars/Avatars',
            });
            myAvatar = result.secure_url;
        }


        user = new User ({
            username,
            email,
            password,
            isAdmin: isAdmin ?? false, // Si no se proporciona un valor, se establece en `false`
            avatar: myAvatar,
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

        user.active = true;
        await user.save();

       
        return cookieToken(user, res);
    } catch (error) {
        return next(new CustomError("Error logging in", 500));
    }
};

export const getCurrentUser = async (req: Request, res: Response) => {
    const user = await User.findById(req.user.id).select("-password"); // No devolver la contraseña
    res.status(200).json(user);
  };
  

// Logout user
export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //const user = await User.findById(req.user.id);
        //if(user) {
        //    user.active = false;
        //    await user.save();
        //}
        
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

// Upload user avatar
export const uploadAvatar = async (req: Request, res: Response, next: NextFunction) => {
    const { path } = req.file as any
  try {
    let result = await cloudinary.uploader.upload(path, {
      folder: 'userAvatart/Avatars',
    });
    res.status(200).json(result.secure_url)
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Internal server error',
    });
  }
};


// Actualizar información del usuario
export const updateUser = async (req: any, res: any): Promise<void> => {
    const { id } = req.params;
    const { isAdmin, ...updates } = req.body;

    try {
        // Verificar si el usuario está actualizando su propio perfil
        if (req.user.id !== id) {
            return res.status(403).json({ message: "Access denied, you can only update your own account" });
        }

        // Asegurar que `isAdmin` no se pueda modificar
        if (isAdmin !== undefined) {
            return res.status(403).json({ message: "Cannot update admin status" });
        }

        // Actualizar el usuario
        const updatedUser = await User.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};

export const getUsers = async (req: any, res: any): Promise<void> => {
    try {
        // Verificar si el usuario es administrador
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "Access denied, admin only" });
        }

        // Obtener todos los usuarios
        const users = await User.find().select("-password"); // Excluye las contraseñas
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users", error });
    }
};

// Eliminar usuario
export const deleteUser = async (req: any, res: any, next: NextFunction) => {
    const { id } = req.params;

    try {
        // Verificar si el usuario es administrador
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "Access denied, admin only" });
        }

        // Eliminar al usuario
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        next(new CustomError("Error deleting user", 500));
    }
};


