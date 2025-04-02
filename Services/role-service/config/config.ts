import { IStorageService } from "../../storage-service/interfaces/IStorageService";

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

  public getPort(): number {
    try {
      const port: string =
        this.storageService.loadVariable("ROLE_SERVICE_PORT");

      return parseInt(port);
    } catch (err: any) {
      throw err;
    }
  }
}

export default Config;
