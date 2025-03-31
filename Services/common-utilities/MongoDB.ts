import ConsoleLoggerService from "logger-service/services/consoleLoggerService";
import mongoose from "mongoose";
import { IStorageService } from "storage-service/interfaces/IStorageService";


// Singleton
// Dependency Injection
//Encapsulation
class MongoDB{
    private static instance: MongoDB;
    private storageService: IStorageService;
    private connectionString: string
    private constructor(storageService: IStorageService){
        this.storageService=storageService;
        const connectionString=this.storageService.loadVariable("MONGO_URL");
        if (!connectionString){
            throw new Error("Database connection string not found in environment.");
        }
        this.connectionString=connectionString;
    }
    public static async  getInstance(storageService: IStorageService):Promise<MongoDB>{
        if(!MongoDB.instance){
            MongoDB.instance= new MongoDB(storageService);
            await MongoDB.instance.connectCluster();
        }
        return MongoDB.instance;
    }
    private async connectCluster():Promise<void>{
        try{
            await mongoose.connect(this.connectionString)
            ConsoleLoggerService.log("Connected to MongoDB cluster");
        }catch(error: any){
            ConsoleLoggerService.logError("MongoDB connection error: ",error);
            throw error;
        }
    }

}

export default MongoDB;