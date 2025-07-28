/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserProps } from "@typings";
import * as JWT from "jwt-decode";

function decodeToken(token: string): {data: UserProps, exp: number} | null {
    const data: any = JWT.jwtDecode(token);
    if(data) return data

    return null
}

function validateToken(token: string): boolean {
    const decodedToken = decodeToken(token);
    if(!decodedToken?.exp) return false

    const currentTime = Date.now() / 1000;
    if(decodedToken.exp < currentTime) return false

    return true
}

export { decodeToken, validateToken }