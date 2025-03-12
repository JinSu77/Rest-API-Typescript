import { IUser, IUserUpdate } from '@model/types/IUser';
import { IORMDeleteResponse, IORMIndexResponse, IORMUpdateResponse } from '@orm/interfaces/IORM';
import { ORM } from '@orm/ORM';
import { Body, Delete, Get, Patch, Path, Query, Route, Security } from 'tsoa';

const READ_COLUMNS = ['id', 'first_name', 'last_name', 'email_address'];

/**
 * Un utilisateur de la plateforme.
 */
@Route("/user")
@Security('jwt')
export class UserController {

  /**
   * Récupérer une page d'utilisateurs.
   */
  @Get()
  public async getUsers(
    /** La page (zéro-index) à récupérer */
    @Query() page?: string,    
    /** Le nombre d'éléments à récupérer (max 50) */
    @Query() limit?: string,    
  ): Promise<IORMIndexResponse<IUser>> {    
    return ORM.Index<IUser>({
      table: 'users',
      columns: READ_COLUMNS,
      query: { page, limit },
    });
  }

  /**
   * Récupérer une utilisateur avec le ID passé dans le URL
   */
  @Get('{id}')
  public async readUser(
    @Path() id: number
  ): Promise<IUser> {
    return ORM.Read<IUser>({
      table: 'users', 
      idKey: 'id', 
      idValue: id, 
      columns: READ_COLUMNS
    });
  }

  /**
   * Mettre à jour un utilisateur avec le ID passé dans le URL
   */
  @Patch('{id}')
  public async updateUser(
    @Path() id: number,
    @Body() body: IUserUpdate
  ): Promise<IORMUpdateResponse> {
    return ORM.Update<IUserUpdate>({
      table: 'users',
      idKey: 'id', 
      idValue: id, 
      body,
    });
  }
  
  /**
   * Supprimer un utilisateur
   */
  @Delete('{id}')
  public async deleteUser(
    @Path() id: number,
  ): Promise<IORMDeleteResponse> {
    return ORM.Delete({
      table: 'users', 
      idKey: 'id', 
      idValue: id, 
    });
  }
}
