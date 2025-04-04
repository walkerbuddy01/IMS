import  { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema(
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


export const User = model("User", userSchema);