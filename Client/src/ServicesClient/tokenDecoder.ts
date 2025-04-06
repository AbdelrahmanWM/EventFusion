// import jwt from "jsonwebtoken";
import {jwtDecode} from 'jwt-decode';
    export interface MyTokenPayload {
      username: string;
      userID: string;
      // Add anything else you include in your token
    }

export default class TokenDecoder {


    public static decodeToken = (token: string): MyTokenPayload | null => {
      try {
        const decoded = jwtDecode<MyTokenPayload>(token);
        return decoded;
      } catch (err) {
        console.error('Invalid token:', err);
        return null;
      }
    };
}