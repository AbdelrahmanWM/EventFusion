import mongoose, {Schema, Document, Model} from "mongoose"
import { IUser } from "../interfaces/IUser"

interface IUserDocument extends IUser,Document {};

const UserSchema: Schema = new Schema(
    {
        username: {type:String, required:true,unique:true},
        firstName: {type:String, required:true},
        lastName: {type:String, required: true},
        email:{type:String, required:true, unique:true},
        password:{type:String, required:true},
        phoneNumber: {type:String},

    },
    {timestamps:true}
);
UserSchema.index({username:1, email: 1});
const User:Model<IUserDocument> = mongoose.model<IUserDocument>('User',UserSchema);
export default User;