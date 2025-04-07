import { IStorageService } from "storage-service/interfaces/IStorageService";
// Singleton design pattern

class Config {
  public storageService: IStorageService;
  private static instance: Config;
  private constructor(storageService: IStorageService) {
    this.storageService = storageService;
  }
  public static getInstance(storageService: IStorageService): Config {
    if (!Config.instance) {
      Config.instance = new Config(storageService);
    }
    /// changing the storage service
    this.setInstanceStorageService(storageService);
    return Config.instance;
  }

  private static setInstanceStorageService(storageService: IStorageService) {
    Config.instance.storageService = storageService;
  }

  private getPort(): number {
    try {
      const port: string = this.storageService.loadVariable("GATEWAY_PORT");

      return parseInt(port);
    } catch (err: any) {
      throw err;
    }
  }

  private getBaseURL(): string {
    try {
      const baseURL: string = this.storageService.loadVariable("BASE_URL");
      return baseURL;
    } catch (err: any) {
      throw err;
    }
  }
  public getURL(): string {
    return this.getBaseURL() + ":" + this.getPort();
  }
}

export default Config;