import { ILoggerService, ILoggerServiceStatic } from "../interfaces/ILoggerService";

class Logger implements ILoggerService{
    public static log(...data: any[]): void {
        console.log(...data);
    }
    public static logError(...data: any[]): void {
        console.error(...data);
    }

}
// This is to inforce the static interface on the class
const ConsoleLoggerService: ILoggerServiceStatic=Logger
export default ConsoleLoggerService