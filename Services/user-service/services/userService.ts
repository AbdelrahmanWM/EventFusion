import { IUser } from "../interfaces/IUser";
import { IUserService } from "../interfaces/IUserService";
import User from "../models/user";

/**
 * Singleton design pattern:
 * Only one instance of user service is needed
 * 
 */
class UserService implements IUserService {
    static userServiceInstance: UserService|null = null;
    private constructor(){}

    public static getUserService(): UserService{
        if (!UserService.userServiceInstance){
            UserService.userServiceInstance=new UserService()
        }
        return UserService.userServiceInstance;
    }

    async getUserList():Promise<IUser[]>{
        try{
            const users: IUser[] = await User.find();
            if(users.length==0){
                throw new Error("No users found.")
            }
            return users;
        }catch(error){
            throw new Error("MongoDB related error.");
        }
    }

    async getUserByUsername(username: string):Promise<IUser|null> {
        try{
            const user:IUser|null = await User.find({username:username})[0];
            if (!user){
                throw new Error("User not found.");
            }
            return user;
        }catch(error){
            throw new Error("MongoDB related error")
        }
    }
    async createUser(userDate: IUser):Promise<IUser>{
        try{
            const user = new User(userDate);
            await user.save();
            return user;
        }catch(error){
            throw new Error("MongoDB related error.");
        }
    }
    async updateUser(username: string, updates: Partial<IUser>):Promise<IUser|null>{
        try{
            const user: IUser| null = await User.findOneAndUpdate({username:username},updates,{new:true});
            if (!user){
                throw new Error("User not found.");
            }
            return user;
        }catch(error){
            throw new Error("MongoDB related error.");
        }
    }

    async deleteUser(username: String):Promise<IUser|null>{
        try{
            const user:IUser|null = await User.findOneAndDelete({username:username});
            if (!user){
                throw new Error("User not found");
            }
            return user;
        }catch(error){
            throw new Error("MongoDB related error.");
        }
    }
}

export default UserService