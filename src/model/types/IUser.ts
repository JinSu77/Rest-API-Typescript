// Définition d'un structure IUser
// A noter, le ? veut dire que le champ est optionnel

export interface IUser {
    id: number;
    first_name?: string;
    last_name?: string;
    email_address: string;
    role_user: 'client' | 'admin';
  }
  
  // Outils de manipulation des types :
  // https://www.typescriptlang.org/docs/handbook/utility-types.html
  // Ici, on rend tous les champs "lecture seul". Typescript ne va pas autoriser l'affectation des champs
  export type IUserRO = Readonly<IUser>;
  
  export type IUserCreate = Omit<IUser, 'id'>;
  
  export type IUserUpdate = Partial<IUserCreate>;