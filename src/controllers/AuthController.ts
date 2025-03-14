import { ApiError } from "@error/ApiError";
import { ErrorCode } from "@error/ErrorCode";
import { IUserCreate, IUserRO } from "@model/types/IUser";
import { IORMCreateResponse } from "@orm/interfaces/IORM";
import { ORM } from "@orm/ORM";
import { Body, Get, Post, Query, Route } from 'tsoa';
import { IAccessToken } from "utility/auth/IAccessToken";
import { Emailer } from "utility/email/Emailer";
import { JWT } from "utility/JWT/JWT";
import { JWT_ACCESS_AUD, JWT_EMAIL_LINK_AUD, JWT_ISSUER, JWT_RENEW_AUD } from "utility/JWT/JWTConstants";

@Route("/auth")
export class AuthController {

  @Post("/register")
  public async Register(
    @Body() body: IUserCreate
  ): Promise<IORMCreateResponse> {
    return ORM.Create<IUserCreate>({
      table: 'users',
      body,
    });
  }
  
  @Post("/login")
  public async sendMagicLink(  
    @Body() body: {
      /**
       * Identifiant de l'utilisateur.
       */
      email: string;
    }
  ): Promise<{ ok: boolean, token: string}> {    
    // Vérifier si on a un utilisateur avec l'adresse email dans notre base
    const user = await ORM.Read<IUserRO>({
      table: 'users',
      idKey: 'email_address',
      idValue: body.email,
      columns: ['id', 'email_address', 'role_user']
    });

   
    // Create the new JWT
    const jwt = new JWT();
    const encoded = await jwt.create({
      id: user.id,
      role: user.role_user
    }, {
      expiresIn: '30 minutes',
      audience: JWT_EMAIL_LINK_AUD,
      issuer: JWT_ISSUER
    }) as string;
    
    const emailer = new Emailer();

    const link = (process.env.FRONT_URL || 'http://localhost:' + (process.env.PORT || 5050)) + '/auth/authorize?jwt=' + encodeURIComponent(encoded);
    await emailer.sendMagicLink(body.email, link, 'Mon service');

    return {
      ok: true,
      token: encoded
    };
  }

  @Post('/renew')
  public async refreshToken(
    @Body() body: {
      refresh_token: string
    }
  ): Promise<{
    access: string;
    refresh: string;
  }> {
    const helper = new JWT();
    
    // Vérifie le refresh token
    const decoded = await helper.decodeAndVerify<IAccessToken>(body.refresh_token, {
      issuer: JWT_ISSUER,
      audience: JWT_RENEW_AUD,
    });

    // Vérifie que l'utilisateur existe toujours et récupère ses rôles à jour
    const user = await ORM.Read<IUserRO>({
      table: 'users',
      idKey: 'id',
      idValue: decoded.id,
      columns: ['id', 'role_user']
    });

    const payload: IAccessToken = {
      id: user.id,
      role: user.role_user
    };

    // Crée un nouveau access token
    const access = await helper.create(payload, {
      expiresIn: '5 minutes',
      issuer: JWT_ISSUER,
      audience: JWT_ACCESS_AUD,
    });

    // Crée un nouveau refresh token
    const refresh = await helper.create(payload, {
      expiresIn: '7 days',
      issuer: JWT_ISSUER,
      audience: JWT_RENEW_AUD,
    });

    return {
      access,
      refresh
    };
  }


  @Get("/authorize")
  public async authorizeFromLink(  
    @Query() jwt: string
  ): Promise<{ 
    access: string;
    refresh: string;
    redirectTo: string;
    message: string;
  }> {    
        
    const helper = new JWT();
    const decoded = await helper.decodeAndVerify(jwt, {
      issuer: JWT_ISSUER,
      audience: JWT_EMAIL_LINK_AUD,
    });

    if (!decoded.id) {
      throw new ApiError(ErrorCode.Unauthorized, 'auth/invalid-authorize-link-token', "userId was not found in the payload for token");
    }

    // Vérifier que l'utilisateur existe toujours
    const user = await ORM.Read<IUserRO>({
      table: 'users',
      idKey: 'id',
      idValue: decoded.id,
      columns: ['id', 'role_user']
    });

    let payload: IAccessToken = {
      id: user.id,
      role: user.role_user
      /** @todo: Ajouter des rôle(s) ici ! */
    };    

    const access = await helper.create(payload, {
      expiresIn: '5 minutes',
      issuer: JWT_ISSUER,
      audience: JWT_ACCESS_AUD,
    }) as string;

    const refresh = await helper.create(payload, {
      expiresIn: '7 days',
      issuer: JWT_ISSUER,
      audience: JWT_RENEW_AUD,
    }) as string;

    return {
      access,
      refresh,
      redirectTo: 'https://lien.vers.mon.front',
      message: 'Normalement ce endpoint va demander au navigateur de rediriger vers votre site ou ressource'
    };
  }

}