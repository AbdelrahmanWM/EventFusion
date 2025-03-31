import { IStorageService } from "../../storage-service/interfaces/IStorageService";

// Singleton design pattern

class Config {
    public storageService: IStorageService
    private static instance: Config;
    private constructor(storageService :IStorageService){
        this.storageService=storageService;
    }
    public static getInstance(storageService: IStorageService): Config {
        if(!Config.instance){
            Config.instance=new Config(storageService);
        }
        /// changing the storage service
        this.setInstanceStorageService(storageService)
        return Config.instance
    }

    private static setInstanceStorageService(storageService: IStorageService){
        Config.instance.storageService=storageService;
    }

    public  getPort(): number {
        const port:string|undefined = this.storageService.loadVariable("ROLE_SERVICE_PORT");
        if(!port){
            throw new Error("ROLE_SERVICE_PORT is not defined in the environment variables.")
        }
        return parseInt(port)
    }
   

}

export default Config;