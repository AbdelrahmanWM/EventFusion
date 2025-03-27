export interface ILoggerService {
    log(...data:any[]):void
    logError(...data:any[]):void
}