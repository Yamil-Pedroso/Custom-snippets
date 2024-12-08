import { Schema, model, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Interfaz para las propiedades del usuario
interface IUser {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  isAdmin: boolean;
}

// Interfaz para los métodos del documento de Mongoose
interface IUserDocument extends IUser, Document {
  isValidatedPassword(enteredPassword: string): Promise<boolean>;
  getSignedJwtToken(): string;
}

// Interfaz para el modelo Mongoose
interface IUserModel extends Model<IUserDocument> {}

// Definición del esquema
const userSchema = new Schema<IUserDocument>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    avatar: { type: String },
  },
  { timestamps: true }
);

// **Hooks**
// Encriptar contraseña antes de guardar
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// **Métodos del documento**
// Generar y devolver el token JWT
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET!,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

// Validar contraseña ingresada
userSchema.methods.isValidatedPassword = async function (
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Crear el modelo
const User = model<IUserDocument, IUserModel>("User", userSchema);

export { User, IUser };
