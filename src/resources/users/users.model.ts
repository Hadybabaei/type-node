import { Schema, model } from "mongoose";
import Users from "./users.interface";
import bcrypt from "bcrypt"

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre('save',async function (next){
    if (!this.isModified('password')){
        return next()
    }else{
        const hash = await bcrypt.hash(this.password,10);
        this.password = hash;
        next()
    }
})

userSchema.methods.isValidPassword =async function (password:string):Promise<Error|boolean>{
    return await bcrypt.compare(password,this.password)
}

export default model<Users>('User',userSchema)
