"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const ApiError_1 = require("../utility/error/ApiError");
const ErrorCode_1 = require("../utility/error/ErrorCode");
const ORM_1 = require("../utility/ORM/ORM");
const tsoa_1 = require("tsoa");
const Emailer_1 = require("../utility/email/Emailer");
const JWT_1 = require("../utility/JWT/JWT");
const JWTConstants_1 = require("../utility/JWT/JWTConstants");
let AuthController = class AuthController {
    async Register(body) {
        return ORM_1.ORM.Create({
            table: 'users',
            body,
        });
    }
    async sendMagicLink(body) {
        // Vérifier si on a un utilisateur avec l'adresse email dans notre base
        const user = await ORM_1.ORM.Read({
            table: 'users',
            idKey: 'email_address',
            idValue: body.email,
            columns: ['id', 'email_address', 'role_user']
        });
        // Create the new JWT
        const jwt = new JWT_1.JWT();
        const encoded = await jwt.create({
            id: user.id,
            role: user.role_user
        }, {
            expiresIn: '30 minutes',
            audience: JWTConstants_1.JWT_EMAIL_LINK_AUD,
            issuer: JWTConstants_1.JWT_ISSUER
        });
        const emailer = new Emailer_1.Emailer();
        const link = (process.env.FRONT_URL || 'http://localhost:' + (process.env.PORT || 5050)) + '/auth/authorize?jwt=' + encodeURIComponent(encoded);
        await emailer.sendMagicLink(body.email, link, 'Mon service');
        return {
            ok: true,
            token: encoded
        };
    }
    async refreshToken(body) {
        const helper = new JWT_1.JWT();
        // Vérifie le refresh token
        const decoded = await helper.decodeAndVerify(body.refresh_token, {
            issuer: JWTConstants_1.JWT_ISSUER,
            audience: JWTConstants_1.JWT_RENEW_AUD,
        });
        // Vérifie que l'utilisateur existe toujours et récupère ses rôles à jour
        const user = await ORM_1.ORM.Read({
            table: 'users',
            idKey: 'id',
            idValue: decoded.id,
            columns: ['id', 'role_user']
        });
        const payload = {
            id: user.id,
            role: user.role_user
        };
        // Crée un nouveau access token
        const access = await helper.create(payload, {
            expiresIn: '5 minutes',
            issuer: JWTConstants_1.JWT_ISSUER,
            audience: JWTConstants_1.JWT_ACCESS_AUD,
        });
        // Crée un nouveau refresh token
        const refresh = await helper.create(payload, {
            expiresIn: '7 days',
            issuer: JWTConstants_1.JWT_ISSUER,
            audience: JWTConstants_1.JWT_RENEW_AUD,
        });
        return {
            access,
            refresh
        };
    }
    async authorizeFromLink(jwt) {
        const helper = new JWT_1.JWT();
        const decoded = await helper.decodeAndVerify(jwt, {
            issuer: JWTConstants_1.JWT_ISSUER,
            audience: JWTConstants_1.JWT_EMAIL_LINK_AUD,
        });
        if (!decoded.id) {
            throw new ApiError_1.ApiError(ErrorCode_1.ErrorCode.Unauthorized, 'auth/invalid-authorize-link-token', "userId was not found in the payload for token");
        }
        // Vérifier que l'utilisateur existe toujours
        const user = await ORM_1.ORM.Read({
            table: 'users',
            idKey: 'id',
            idValue: decoded.id,
            columns: ['id', 'role_user']
        });
        let payload = {
            id: user.id,
            role: user.role_user
            /** @todo: Ajouter des rôle(s) ici ! */
        };
        const access = await helper.create(payload, {
            expiresIn: '5 minutes',
            issuer: JWTConstants_1.JWT_ISSUER,
            audience: JWTConstants_1.JWT_ACCESS_AUD,
        });
        const refresh = await helper.create(payload, {
            expiresIn: '7 days',
            issuer: JWTConstants_1.JWT_ISSUER,
            audience: JWTConstants_1.JWT_RENEW_AUD,
        });
        return {
            access,
            refresh,
            redirectTo: 'https://lien.vers.mon.front',
            message: 'Normalement ce endpoint va demander au navigateur de rediriger vers votre site ou ressource'
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, tsoa_1.Post)("/register"),
    __param(0, (0, tsoa_1.Body)())
], AuthController.prototype, "Register", null);
__decorate([
    (0, tsoa_1.Post)("/login"),
    __param(0, (0, tsoa_1.Body)())
], AuthController.prototype, "sendMagicLink", null);
__decorate([
    (0, tsoa_1.Post)('/renew'),
    __param(0, (0, tsoa_1.Body)())
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, tsoa_1.Get)("/authorize"),
    __param(0, (0, tsoa_1.Query)())
], AuthController.prototype, "authorizeFromLink", null);
exports.AuthController = AuthController = __decorate([
    (0, tsoa_1.Route)("/auth")
], AuthController);
