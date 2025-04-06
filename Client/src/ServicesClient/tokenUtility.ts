// import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
export interface MyTokenPayload {
  username: string;
  userID: string;
  // Add anything else you include in your token
}

export default class TokenUtility {
  private static decodeToken = (token: string): MyTokenPayload | null => {
    try {
      const decoded = jwtDecode<MyTokenPayload>(token);
      return decoded;
    } catch (err) {
      console.error("Invalid token:", err);
      return null;
    }
  };
  public static getToken=():string|null=>{
    return localStorage.getItem("auth_token") 
  }
  public static exists=():boolean=>{
    return localStorage.getItem("auth_token")!=null
  }
  public static removeToken=():void=>{
    localStorage.removeItem("auth_token")
  }
  public static getDecodedToken=():MyTokenPayload|null =>{
    
    const token = this.getToken();
    if(!token){
      return null;
    }
    const decodedToken = this.decodeToken(token);
    if(!decodedToken){
      return null;
    }
    return decodedToken;
  }
  public static getUsername=():string|null =>{
    const decodedToken:MyTokenPayload|null= this.getDecodedToken();
    if(!decodedToken){
      return null;
    }
    return decodedToken.username;
  }

}
