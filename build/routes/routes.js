"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = RegisterRoutes;
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const UsersController_1 = require("./../controllers/UsersController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const FilmController_1 = require("./../controllers/FilmController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const FilmActorController_1 = require("./../controllers/FilmActorController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const AuthController_1 = require("./../controllers/AuthController");
const authentication_middleware_1 = require("./../utility/auth/authentication.middleware");
const expressAuthenticationRecasted = authentication_middleware_1.expressAuthentication;
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "IUser": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "first_name": { "dataType": "string" },
            "last_name": { "dataType": "string" },
            "email_address": { "dataType": "string", "required": true },
            "role_user": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["client"] }, { "dataType": "enum", "enums": ["admin"] }], "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IORMIndexResponse_IUser_": {
        "dataType": "refObject",
        "properties": {
            "page": { "dataType": "double", "required": true },
            "limit": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "rows": { "dataType": "array", "array": { "dataType": "refObject", "ref": "IUser" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IORMUpdateResponse": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "string" }], "required": true },
            "rows": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_IUserCreate_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "first_name": { "dataType": "string" }, "last_name": { "dataType": "string" }, "email_address": { "dataType": "string" }, "role_user": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["client"] }, { "dataType": "enum", "enums": ["admin"] }] } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUserUpdate": {
        "dataType": "refAlias",
        "type": { "ref": "Partial_IUserCreate_", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IORMDeleteResponse": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "string" }], "required": true },
            "rows": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IFilm": {
        "dataType": "refObject",
        "properties": {
            "film_id": { "dataType": "double", "required": true },
            "title": { "dataType": "string", "required": true },
            "description": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "release_year": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "language_id": { "dataType": "double", "required": true },
            "original_language_id": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "rental_duration": { "dataType": "double", "required": true },
            "rental_rate": { "dataType": "double", "required": true },
            "length": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
            "replacement_cost": { "dataType": "double", "required": true },
            "rating": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["G"] }, { "dataType": "enum", "enums": ["PG"] }, { "dataType": "enum", "enums": ["PG-13"] }, { "dataType": "enum", "enums": ["R"] }, { "dataType": "enum", "enums": ["NC-17"] }, { "dataType": "enum", "enums": [null] }] },
            "special_features": { "dataType": "union", "subSchemas": [{ "dataType": "array", "array": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["Trailers"] }, { "dataType": "enum", "enums": ["Commentaries"] }, { "dataType": "enum", "enums": ["Deleted Scenes"] }, { "dataType": "enum", "enums": ["Behind the Scenes"] }] } }, { "dataType": "enum", "enums": [null] }] },
            "last_update": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IORMIndexResponse_IFilm_": {
        "dataType": "refObject",
        "properties": {
            "page": { "dataType": "double", "required": true },
            "limit": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "rows": { "dataType": "array", "array": { "dataType": "refObject", "ref": "IFilm" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IORMCreateResponse": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IFilm.Exclude_keyofIFilm.film_id__": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "title": { "dataType": "string", "required": true }, "description": { "dataType": "string" }, "release_year": { "dataType": "double" }, "language_id": { "dataType": "double", "required": true }, "original_language_id": { "dataType": "double" }, "rental_duration": { "dataType": "double", "required": true }, "rental_rate": { "dataType": "double", "required": true }, "length": { "dataType": "double" }, "replacement_cost": { "dataType": "double", "required": true }, "rating": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["G"] }, { "dataType": "enum", "enums": ["PG"] }, { "dataType": "enum", "enums": ["PG-13"] }, { "dataType": "enum", "enums": ["R"] }, { "dataType": "enum", "enums": ["NC-17"] }] }, "special_features": { "dataType": "array", "array": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["Trailers"] }, { "dataType": "enum", "enums": ["Commentaries"] }, { "dataType": "enum", "enums": ["Deleted Scenes"] }, { "dataType": "enum", "enums": ["Behind the Scenes"] }] } }, "last_update": { "dataType": "datetime", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_IFilm.film_id_": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_IFilm.Exclude_keyofIFilm.film_id__", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IFilmCreate": {
        "dataType": "refAlias",
        "type": { "ref": "Omit_IFilm.film_id_", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_IFilmCreate_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "title": { "dataType": "string" }, "description": { "dataType": "string" }, "release_year": { "dataType": "double" }, "language_id": { "dataType": "double" }, "original_language_id": { "dataType": "double" }, "rental_duration": { "dataType": "double" }, "rental_rate": { "dataType": "double" }, "length": { "dataType": "double" }, "replacement_cost": { "dataType": "double" }, "rating": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["G"] }, { "dataType": "enum", "enums": ["PG"] }, { "dataType": "enum", "enums": ["PG-13"] }, { "dataType": "enum", "enums": ["R"] }, { "dataType": "enum", "enums": ["NC-17"] }] }, "special_features": { "dataType": "array", "array": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["Trailers"] }, { "dataType": "enum", "enums": ["Commentaries"] }, { "dataType": "enum", "enums": ["Deleted Scenes"] }, { "dataType": "enum", "enums": ["Behind the Scenes"] }] } }, "last_update": { "dataType": "datetime" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IFilmUpdate": {
        "dataType": "refAlias",
        "type": { "ref": "Partial_IFilmCreate_", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IActor": {
        "dataType": "refObject",
        "properties": {
            "actor_id": { "dataType": "double", "required": true },
            "first_name": { "dataType": "string", "required": true },
            "last_name": { "dataType": "string", "required": true },
            "last_update": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IORMIndexResponse_IActor_": {
        "dataType": "refObject",
        "properties": {
            "page": { "dataType": "double", "required": true },
            "limit": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
            "rows": { "dataType": "array", "array": { "dataType": "refObject", "ref": "IActor" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IUser.Exclude_keyofIUser.id__": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "first_name": { "dataType": "string" }, "last_name": { "dataType": "string" }, "email_address": { "dataType": "string", "required": true }, "role_user": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["client"] }, { "dataType": "enum", "enums": ["admin"] }], "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_IUser.id_": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_IUser.Exclude_keyofIUser.id__", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUserCreate": {
        "dataType": "refAlias",
        "type": { "ref": "Omit_IUser.id_", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new runtime_1.ExpressTemplateService(models, { "noImplicitAdditionalProperties": "throw-on-extras", "bodyCoercion": true });
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    const argsUserController_getUsers = {
        page: { "in": "query", "name": "page", "dataType": "string" },
        limit: { "in": "query", "name": "limit", "dataType": "string" },
    };
    app.get('/user', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(UsersController_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(UsersController_1.UserController.prototype.getUsers)), async function UserController_getUsers(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getUsers, request, response });
            const controller = new UsersController_1.UserController();
            await templateService.apiHandler({
                methodName: 'getUsers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUserController_readUser = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
    };
    app.get('/user/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(UsersController_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(UsersController_1.UserController.prototype.readUser)), async function UserController_readUser(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUserController_readUser, request, response });
            const controller = new UsersController_1.UserController();
            await templateService.apiHandler({
                methodName: 'readUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUserController_updateUser = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        body: { "in": "body", "name": "body", "required": true, "ref": "IUserUpdate" },
    };
    app.patch('/user/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(UsersController_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(UsersController_1.UserController.prototype.updateUser)), async function UserController_updateUser(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUserController_updateUser, request, response });
            const controller = new UsersController_1.UserController();
            await templateService.apiHandler({
                methodName: 'updateUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUserController_deleteUser = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
    };
    app.delete('/user/:id', authenticateMiddleware([{ "jwt": [] }]), ...((0, runtime_1.fetchMiddlewares)(UsersController_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(UsersController_1.UserController.prototype.deleteUser)), async function UserController_deleteUser(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsUserController_deleteUser, request, response });
            const controller = new UsersController_1.UserController();
            await templateService.apiHandler({
                methodName: 'deleteUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsFilmController_getFilms = {
        page: { "in": "query", "name": "page", "dataType": "string" },
        limit: { "in": "query", "name": "limit", "dataType": "string" },
    };
    app.get('/film', ...((0, runtime_1.fetchMiddlewares)(FilmController_1.FilmController)), ...((0, runtime_1.fetchMiddlewares)(FilmController_1.FilmController.prototype.getFilms)), async function FilmController_getFilms(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsFilmController_getFilms, request, response });
            const controller = new FilmController_1.FilmController();
            await templateService.apiHandler({
                methodName: 'getFilms',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsFilmController_readUser = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
    };
    app.get('/film/:id', ...((0, runtime_1.fetchMiddlewares)(FilmController_1.FilmController)), ...((0, runtime_1.fetchMiddlewares)(FilmController_1.FilmController.prototype.readUser)), async function FilmController_readUser(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsFilmController_readUser, request, response });
            const controller = new FilmController_1.FilmController();
            await templateService.apiHandler({
                methodName: 'readUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsFilmController_createFilm = {
        body: { "in": "body", "name": "body", "required": true, "ref": "IFilmCreate" },
    };
    app.put('/film', authenticateMiddleware([{ "jwt": ["admin"] }]), ...((0, runtime_1.fetchMiddlewares)(FilmController_1.FilmController)), ...((0, runtime_1.fetchMiddlewares)(FilmController_1.FilmController.prototype.createFilm)), async function FilmController_createFilm(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsFilmController_createFilm, request, response });
            const controller = new FilmController_1.FilmController();
            await templateService.apiHandler({
                methodName: 'createFilm',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsFilmController_updateFilm = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        body: { "in": "body", "name": "body", "required": true, "ref": "IFilmUpdate" },
    };
    app.patch('/film/:id', authenticateMiddleware([{ "jwt": ["admin"] }]), ...((0, runtime_1.fetchMiddlewares)(FilmController_1.FilmController)), ...((0, runtime_1.fetchMiddlewares)(FilmController_1.FilmController.prototype.updateFilm)), async function FilmController_updateFilm(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsFilmController_updateFilm, request, response });
            const controller = new FilmController_1.FilmController();
            await templateService.apiHandler({
                methodName: 'updateFilm',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsFilmController_deleteFilm = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
    };
    app.delete('/film/:id', authenticateMiddleware([{ "jwt": ["admin"] }]), ...((0, runtime_1.fetchMiddlewares)(FilmController_1.FilmController)), ...((0, runtime_1.fetchMiddlewares)(FilmController_1.FilmController.prototype.deleteFilm)), async function FilmController_deleteFilm(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsFilmController_deleteFilm, request, response });
            const controller = new FilmController_1.FilmController();
            await templateService.apiHandler({
                methodName: 'deleteFilm',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsFilmActorController_getFilmActors = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
    };
    app.get('/film/:id/actor', ...((0, runtime_1.fetchMiddlewares)(FilmActorController_1.FilmActorController)), ...((0, runtime_1.fetchMiddlewares)(FilmActorController_1.FilmActorController.prototype.getFilmActors)), async function FilmActorController_getFilmActors(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsFilmActorController_getFilmActors, request, response });
            const controller = new FilmActorController_1.FilmActorController();
            await templateService.apiHandler({
                methodName: 'getFilmActors',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsFilmActorController_getFilmActor = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        actorId: { "in": "path", "name": "actorId", "required": true, "dataType": "double" },
    };
    app.get('/film/:id/actor/:actorId', ...((0, runtime_1.fetchMiddlewares)(FilmActorController_1.FilmActorController)), ...((0, runtime_1.fetchMiddlewares)(FilmActorController_1.FilmActorController.prototype.getFilmActor)), async function FilmActorController_getFilmActor(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsFilmActorController_getFilmActor, request, response });
            const controller = new FilmActorController_1.FilmActorController();
            await templateService.apiHandler({
                methodName: 'getFilmActor',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsAuthController_Register = {
        body: { "in": "body", "name": "body", "required": true, "ref": "IUserCreate" },
    };
    app.post('/auth/register', ...((0, runtime_1.fetchMiddlewares)(AuthController_1.AuthController)), ...((0, runtime_1.fetchMiddlewares)(AuthController_1.AuthController.prototype.Register)), async function AuthController_Register(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_Register, request, response });
            const controller = new AuthController_1.AuthController();
            await templateService.apiHandler({
                methodName: 'Register',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsAuthController_sendMagicLink = {
        body: { "in": "body", "name": "body", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "email": { "dataType": "string", "required": true } } },
    };
    app.post('/auth/login', ...((0, runtime_1.fetchMiddlewares)(AuthController_1.AuthController)), ...((0, runtime_1.fetchMiddlewares)(AuthController_1.AuthController.prototype.sendMagicLink)), async function AuthController_sendMagicLink(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_sendMagicLink, request, response });
            const controller = new AuthController_1.AuthController();
            await templateService.apiHandler({
                methodName: 'sendMagicLink',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsAuthController_refreshToken = {
        body: { "in": "body", "name": "body", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "refresh_token": { "dataType": "string", "required": true } } },
    };
    app.post('/auth/renew', ...((0, runtime_1.fetchMiddlewares)(AuthController_1.AuthController)), ...((0, runtime_1.fetchMiddlewares)(AuthController_1.AuthController.prototype.refreshToken)), async function AuthController_refreshToken(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_refreshToken, request, response });
            const controller = new AuthController_1.AuthController();
            await templateService.apiHandler({
                methodName: 'refreshToken',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsAuthController_authorizeFromLink = {
        jwt: { "in": "query", "name": "jwt", "required": true, "dataType": "string" },
    };
    app.get('/auth/authorize', ...((0, runtime_1.fetchMiddlewares)(AuthController_1.AuthController)), ...((0, runtime_1.fetchMiddlewares)(AuthController_1.AuthController.prototype.authorizeFromLink)), async function AuthController_authorizeFromLink(request, response, next) {
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_authorizeFromLink, request, response });
            const controller = new AuthController_1.AuthController();
            await templateService.apiHandler({
                methodName: 'authorizeFromLink',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function authenticateMiddleware(security = []) {
        return async function runAuthenticationMiddleware(request, response, next) {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts = [];
            const pushAndRethrow = (error) => {
                failedAttempts.push(error);
                throw error;
            };
            const secMethodOrPromises = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises = [];
                    for (const name in secMethod) {
                        secMethodAndPromises.push(expressAuthenticationRecasted(request, name, secMethod[name], response)
                            .catch(pushAndRethrow));
                    }
                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                }
                else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(expressAuthenticationRecasted(request, name, secMethod[name], response)
                            .catch(pushAndRethrow));
                    }
                }
            }
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            try {
                request['user'] = await Promise.any(secMethodOrPromises);
                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next();
            }
            catch (err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;
                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        };
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
