import APIGateway from "APIGateway";
import Config from "config";
import { IStorageService } from "storage-service/interfaces/IStorageService";
import { DotenvStorageService } from "storage-service/services/envStorageService";

class Main {
  public static main(): void {
    const storageService: IStorageService = DotenvStorageService.getInstance();
    const config = Config.getInstance(storageService);
    const apiGateway = APIGateway.getInstance(config);
    apiGateway.start();
  }
}

Main.main();
