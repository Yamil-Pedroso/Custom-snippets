import { Schema, model, Types } from "mongoose";

interface IComponent {
  name: string;
  description?: string;
  codeSnippet: string;
  tags: string[];
  category?: string;
  createdAt?: Date;
  userId: Types.ObjectId;
  isPublic?: boolean;
  shareUrl?: string;
}

const ComponentSchema = new Schema<IComponent>({
  name: { type: String, required: true, trim: true, minlength: 3 },
  description: { type: String, trim: true, maxlength: 500 },
  codeSnippet: { type: String, required: true, minlength: 10 },
  category: {
    type: String,
    required: true,
    enum: [
      "JavaScript",
      "Python",
      "CSS",
      "React",
      "Backend",
      "Database",
      "Others",
    ],
  },
  tags: {
    type: [String],
    required: true,
    validate: {
      validator: (tags: string[]) => tags.every((tag) => tag.trim().length > 0),
      message: "Each tag must be a non-empty string.",
    },
  },
  createdAt: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  isPublic: { type: Boolean, default: false },
  shareUrl: { type: String, unique: true },
});

// Generar URL única al guardar un snippet público
ComponentSchema.pre("save", function (next) {
  if (this.isPublic && !this.shareUrl) {
    this.shareUrl = `${process.env.FRONTEND_URL}/snippets/${this._id}`;
  }
  next();
});

// Cambia cómo se serializa el modelo a JSON
ComponentSchema.set("toJSON", {
  virtuals: true, // Incluye los virtuals (como `id`)
  versionKey: false, // Oculta el campo `__v`
  transform: (_, ret) => {
    ret.id = ret._id; // Renombra `_id` a `id`
    delete ret._id; // Elimina `_id`
  },
});

ComponentSchema.index(
  { name: "text", description: "text", tags: "text" },
  { weights: { name: 5, description: 2, tags: 1 } }
);

const Component = model<IComponent>("Component", ComponentSchema);

export { Component };
