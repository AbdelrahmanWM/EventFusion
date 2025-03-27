import { ILoggerService } from "../interfaces/ILoggerService";

class ConsoleLoggerService implements ILoggerService{
    log(...data: any[]): void {
        console.log(...data);
    }
    logError(...data: any[]): void {
        console.error(...data);
    }

}

export default ConsoleLoggerService