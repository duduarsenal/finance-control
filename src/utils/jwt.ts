/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserProps } from "@typings";
import * as JWT from 'jsonwebtoken';

function decodeToken(token: string): UserProps | null {
    const data: any = JWT.decode(token);
    if(data) return data

    return null
}

export { decodeToken }