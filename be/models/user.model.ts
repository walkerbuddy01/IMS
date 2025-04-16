import  { Model, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface IUser {
  email: string;
  fullname: string;
  avatar: string;
  password: string;
}

// 2. Interface for instance methods
interface IUserMethods {
  isPasswordCorrect(plainPassword: string): Promise<boolean>;
  generateAccessToken(): string;
}

// 3. Combine to make model type
export type UserModel = Model<IUser, {}, IUserMethods>;


const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String, // cloudinary
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
    return;
  }
  const password = await bcrypt.hash(this.password, 10);
  this.password = password;
  next();
}); 

userSchema.methods.isPasswordCorrect = async function (
  plainPassword:string
) {
  return await bcrypt.compare(
    plainPassword,
    this.password
  );
}; 

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET!,
  );
};


export const User = model("User", userSchema);