// Définition d'un structure IFilm
// A noter, le ? veut dire que le champ est optionnel

export interface IFilm {
    film_id: number;
    title: string;
    description?: string | null;
    release_year?: number | null;
    language_id: number;
    original_language_id?: number | null;
    rental_duration: number;
    rental_rate: number;
    length?: number | null;
    replacement_cost: number;
    rating?: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17' | null;
    special_features?: ('Trailers' | 'Commentaries' | 'Deleted Scenes' | 'Behind the Scenes')[] | null;
    last_update: Date;
  }
  
  // Outils de manipulation des types :
  // https://www.typescriptlang.org/docs/handbook/utility-types.html
  // Ici, on rend tous les champs "lecture seul". Typescript ne va pas autoriser l'affectation des champs
  export type IFilmRO = Readonly<IFilm>;
  
  export type IFilmCreate = Omit<IFilm, 'film_id'>;
  
  export type IFilmUpdate = Partial<IFilmCreate>;