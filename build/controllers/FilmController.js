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
exports.FilmController = void 0;
const ORM_1 = require("../utility/ORM/ORM");
const tsoa_1 = require("tsoa");
const READ_COLUMNS = ['film_id', 'title', 'description', 'release_year', 'language_id', 'original_language_id', 'rental_duration', 'rental_rate', 'length', 'replacement_cost', 'rating', 'special_features', 'last_update'];
/**
 * Un film de la plateforme
 */
let FilmController = class FilmController {
    /**
     * Récupération de tous les films avec une pagination et limite
     */
    async getFilms(page, limit) {
        return ORM_1.ORM.Index({
            table: 'film',
            columns: READ_COLUMNS,
            query: { page, limit }
        });
    }
    /**
     * Récupération d'un seul film
     */
    async readUser(id) {
        return ORM_1.ORM.Read({
            table: 'film',
            idKey: 'film_id',
            idValue: id,
            columns: READ_COLUMNS
        });
    }
    /**
     * Création d'un film
     */
    async createFilm(body) {
        return ORM_1.ORM.Create({
            table: 'film',
            body,
        });
    }
    /**
     * Mise à jour d'un film
     */
    async updateFilm(id, body) {
        return ORM_1.ORM.Update({
            table: 'film',
            idKey: 'film_id',
            idValue: id,
            body,
        });
    }
    /**
     * Supprime un film
     */
    async deleteFilm(id) {
        return ORM_1.ORM.Delete({
            table: 'film',
            idKey: 'film_id',
            idValue: id,
        });
    }
};
exports.FilmController = FilmController;
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)())
], FilmController.prototype, "getFilms", null);
__decorate([
    (0, tsoa_1.Get)('{id}'),
    __param(0, (0, tsoa_1.Path)())
], FilmController.prototype, "readUser", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['admin']),
    (0, tsoa_1.Put)(),
    __param(0, (0, tsoa_1.Body)())
], FilmController.prototype, "createFilm", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['admin']),
    (0, tsoa_1.Patch)('{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)())
], FilmController.prototype, "updateFilm", null);
__decorate([
    (0, tsoa_1.Security)('jwt', ['admin']),
    (0, tsoa_1.Delete)('{id}'),
    __param(0, (0, tsoa_1.Path)())
], FilmController.prototype, "deleteFilm", null);
exports.FilmController = FilmController = __decorate([
    (0, tsoa_1.Route)("/film")
    // @Security('jwt')
], FilmController);
