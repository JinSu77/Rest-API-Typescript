import { IFilm, IFilmCreate, IFilmUpdate } from "@model/types/IFilm";
import { IORMCreateResponse, IORMDeleteResponse, IORMIndexResponse, IORMUpdateResponse } from "@orm/interfaces/IORM";
import { ORM } from "@orm/ORM";
import { Body, Delete, Get, Patch, Path, Put, Query, Route, Security } from "tsoa";

const READ_COLUMNS = ['film_id', 'title', 'description', 'release_year', 'language_id', 'original_language_id', 'rental_duration', 'rental_rate', 'length', 'replacement_cost', 'rating', 'special_features', 'last_update'];

/**
 * Un film de la plateforme
 */
@Route("/film")
// @Security('jwt')
export class FilmController {
    
    /**
     * 
     * @param page 
     * @param limit 
     * @returns 
     */
    @Get()
    public async getFilms(
        @Query() page?: string,
        @Query() limit?: string,
    ): Promise<IORMIndexResponse<IFilm>> {
        return ORM.Index<IFilm>({
            table: 'film',
            columns: READ_COLUMNS,
            query: { page, limit }
        })
    }

    /**
     * 
     * @param id 
     * @returns 
     */
    @Get('{id}')
    public async readUser(
      @Path() id: number
    ): Promise<IFilm> {
      return ORM.Read<IFilm>({
        table: 'film', 
        idKey: 'film_id', 
        idValue: id, 
        columns: READ_COLUMNS
      });
    }

    /**
     * 
     * @param body 
     * @returns 
     */
    @Put()
    public async createFilm(
      @Body() body: IFilmCreate
    ): Promise<IORMCreateResponse> {
      return ORM.Create<IFilmCreate>({
        table: 'film',
        body,
      });
    }

    /**
     * 
     * @param id 
     * @param body 
     * @returns 
     */
    @Patch('{id}')
    public async updateFilm(
      @Path() id: number,
      @Body() body: IFilmUpdate
    ): Promise<IORMUpdateResponse> {
      return ORM.Update<IFilmUpdate>({
        table: 'film',
        idKey: 'film_id', 
        idValue: id, 
        body,
      });
    }

    /**
     * 
     * @param id 
     * @returns 
     */
    @Delete('{id}')
    public async deleteFilm(
      @Path() id: number,
    ): Promise<IORMDeleteResponse> {
      return ORM.Delete({
        table: 'film', 
        idKey: 'film_id', 
        idValue: id, 
      });
    }
}