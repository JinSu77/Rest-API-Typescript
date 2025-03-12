import { Get, Path, Route, Security } from "tsoa";
import { IActor } from "@model/types/IActor";
import { IORMIndexResponse } from "@orm/interfaces/IORM";
import { ORM } from "@orm/ORM";

const READ_COLUMNS = ['a.actor_id', 'a.first_name', 'a.last_name', 'a.last_update'];

@Route("/film/{id}/actor")
// @Security('jwt')
export class FilmActorController {

    /**
     * Récupère tous les acteurs d'un film
     */
    @Get()
    public async getFilmActors(
        @Path() id: number
    ): Promise<IORMIndexResponse<IActor>> {
        return ORM.GetAllActorsFromFilm(id);
    }

    /**
     * Récupère un acteur spécifique d'un film
     */
    @Get('{actorId}')
    public async getFilmActor(
        @Path() id: number,
        @Path() actorId: number
    ): Promise<IActor> {
        return ORM.GetSingleActorFromFilm(id, actorId);
    }
}