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
exports.FilmActorController = void 0;
const tsoa_1 = require("tsoa");
const ORM_1 = require("../utility/ORM/ORM");
let FilmActorController = class FilmActorController {
    /**
     * Récupère tous les acteurs d'un film
     */
    async getFilmActors(id) {
        return ORM_1.ORM.GetAllActorsFromFilm(id);
    }
    /**
     * Récupère un acteur spécifique d'un film
     */
    async getFilmActor(id, actorId) {
        return ORM_1.ORM.GetSingleActorFromFilm(id, actorId);
    }
};
exports.FilmActorController = FilmActorController;
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Path)())
], FilmActorController.prototype, "getFilmActors", null);
__decorate([
    (0, tsoa_1.Get)('{actorId}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Path)())
], FilmActorController.prototype, "getFilmActor", null);
exports.FilmActorController = FilmActorController = __decorate([
    (0, tsoa_1.Route)("/film/{id}/actor")
    // @Security('jwt')
], FilmActorController);
