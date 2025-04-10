import { IUser } from "../interfaces/IUser";
import { IUserService } from "../interfaces/IUserService";
import User from "../models/user";
import bcrypt from "bcryptjs";
/**
 * Singleton design pattern:
 * Only one instance of user service is needed
 * 
 */
class UserService implements IUserService {
    static userServiceInstance: UserService|null = null;
    private constructor(){}

    public static getInstance(): UserService{
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
        }catch(error: any){
            throw new Error(`Failed to fetch users: ${error.message}`);
        }
    }

    async getUserByUsername(username: string):Promise<IUser
    > {
        try{
            const matching = await User.find({username:username});
            if (!matching){
                throw new Error("User not found.")
            }
            const user:IUser|null = matching[0];
            if (!user){
                throw new Error("User not found.");
            }
            return user;
        }catch(error: any){
            throw new Error(`Failed to fetch user: ${error.message}`)
        }
    }
    async createUser(userDate: IUser):Promise<IUser>{
        try{
            const user = new User(userDate);
            const hashedPassword =await bcrypt.hash(user.password,10);
            user.password=hashedPassword
            await user.save();
            return user;
        }catch(error: any){
                throw new Error(`Failed to create user: ${error.message}`);
              
        }
    }
    async updateUser(username: string, updates: Partial<IUser>):Promise<IUser>{
        try{
            const user: IUser| null = await User.findOneAndUpdate({username:username},updates,{new:true});
            if (!user){
                throw new Error("User not found.");
            }
            return user;
        }catch(error: any){
            throw new Error(`Failed to update user: ${error.message}`);
        }
    }
    async updateUserBalance(username: string, addedToBalance: number): Promise<IUser> {
        try {
            if (isNaN(addedToBalance)) {
                throw new Error("Added balance is not a valid number.");
            }
    
            console.log(`Incrementing balance for ${username} by ${addedToBalance}`);
    
            const currentUser = await User.findOne({ username: username });
    
            if (!currentUser) {
                throw new Error("User not found.");
            }
            const newBalance = currentUser.balance + addedToBalance;
            const updatedUser = await this.updateUser(username, { balance: newBalance });
    
            console.log(`User balance updated: ${updatedUser.balance}`); 
            return updatedUser;
        } catch (error: any) {
            console.error(`Failed to update user balance: ${error.message}`);
            throw new Error(`Failed to update user balance: ${error.message}`);
        }
    }
    
    
    async deleteUser(username: String):Promise<IUser>{
        try{
            const user:IUser|null = await User.findOneAndDelete({username:username});
            if (!user){
                throw new Error("User not found");
            }
            return user;
        }catch(error: any){
            throw new Error(`Failed to delete user: ${error.message}`);
        }
    }
    async comparePasswords(inputPassword: string, hashedPassword: string):Promise<boolean>{
        try{
            const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
            return isMatch;
        }catch(error: any){
            throw new Error(`Error comparing passwords: ${error.message}`)
        }
    }
}

export default UserService