import { IStorageService } from "../interfaces/IStorageService";
import path from "path"
import fs from "fs"
import dotenv from "dotenv"
dotenv.config();

export class DotenvStorageService implements IStorageService {

    private envFilePath = path.resolve(__dirname,"../../",".env")
    loadVariable(variable: string): string | undefined {
        const envVariables = process.env;
        return envVariables[variable];
    }
    setVariable(variable: string, value: String): void {
        const envContent = fs.readFileSync(this.envFilePath,'utf8');
        const regex = new RegExp(`^${variable}=[^\r\n]*`, 'm')
        if(regex.test(envContent)){
            const newContent = envContent.replace(regex,`${variable}=${value}`);
            fs.writeFileSync(this.envFilePath,newContent,'utf8');
        }else{
            fs.appendFileSync(this.envFilePath,`\n${variable}=${value}`,'utf8');
        }
        
    }
    
}