import { ApiError } from '@error/ApiError';
import { ErrorCode } from '@error/ErrorCode';
import { Request } from 'express';
import { JWT } from 'utility/JWT/JWT';
import { JWT_ACCESS_AUD, JWT_ISSUER } from 'utility/JWT/JWTConstants';
import { IAccessToken } from './IAccessToken';

export async function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<IAccessToken|null> {

  if (securityName === 'jwt') {
    const authheader = request.headers.authorization || '';
    if (!authheader.startsWith('Bearer ')) {
      throw new ApiError(ErrorCode.Unauthorized, 'auth/missing-header', 'Missing authorization header with Bearer token');
    }

    const token = authheader.split('Bearer ')[1];

    const jwt = new JWT();
    let decoded = await jwt.decodeAndVerify<IAccessToken>(token, {
      issuer: JWT_ISSUER,
      audience: JWT_ACCESS_AUD,
    });
    if (scopes?.length) {

      const userScope = decoded.role;

      for (let scope of scopes) {
        if (!userScope.includes(scope)) {
          throw new ApiError(
            ErrorCode.Forbidden,
            'authentification/role-requires',
            'Auth user is not authorized here'
          )
        }
      }
    }

    return decoded;
  }

  return null;
}