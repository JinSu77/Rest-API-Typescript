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
exports.UserController = void 0;
const ORM_1 = require("../utility/ORM/ORM");
const tsoa_1 = require("tsoa");
const READ_COLUMNS = ['id', 'first_name', 'last_name', 'email_address', 'role_user'];
/**
 * Un utilisateur de la plateforme.
 */
let UserController = class UserController {
    /**
     * Récupérer une page d'utilisateurs.
     */
    async getUsers(page, limit) {
        return ORM_1.ORM.Index({
            table: 'users',
            columns: READ_COLUMNS,
            query: { page, limit },
        });
    }
    /**
     * Récupérer une utilisateur avec le ID passé dans le URL
     */
    async readUser(id) {
        return ORM_1.ORM.Read({
            table: 'users',
            idKey: 'id',
            idValue: id,
            columns: READ_COLUMNS
        });
    }
    /**
     * Mettre à jour un utilisateur avec le ID passé dans le URL
     */
    async updateUser(id, body) {
        return ORM_1.ORM.Update({
            table: 'users',
            idKey: 'id',
            idValue: id,
            body,
        });
    }
    /**
     * Supprimer un utilisateur
     */
    async deleteUser(id) {
        return ORM_1.ORM.Delete({
            table: 'users',
            idKey: 'id',
            idValue: id,
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)())
], UserController.prototype, "getUsers", null);
__decorate([
    (0, tsoa_1.Get)('{id}'),
    __param(0, (0, tsoa_1.Path)())
], UserController.prototype, "readUser", null);
__decorate([
    (0, tsoa_1.Patch)('{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)())
], UserController.prototype, "updateUser", null);
__decorate([
    (0, tsoa_1.Delete)('{id}'),
    __param(0, (0, tsoa_1.Path)())
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, tsoa_1.Route)("/user"),
    (0, tsoa_1.Security)('jwt')
], UserController);
