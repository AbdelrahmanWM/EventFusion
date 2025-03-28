export interface ILoggerService {
}
export interface ILoggerServiceStatic {
    log(...data:any[]):void
    logError(...data:any[]):void
}