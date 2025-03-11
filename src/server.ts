import Express, { NextFunction, Request, Response } from "express";
import { join } from 'path';
import { json } from 'body-parser';
import { DefaultErrorHandler } from "@error/error-handler.middleware";
import { RegisterRoutes } from "@routes/routes";
import * as swaggerUi from "swagger-ui-express";

// Récupérer le port des variables d'environnement ou préciser une valeur par défaut
const PORT = process.env.PORT || 5050;

// Créer l'objet Express
const app = Express();

// Servir le contenu static du dossier `public`
app.use(Express.static("public"));
// Créer une route qui permet de convertir le .json en format html
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

// Ajouter un 'middleware' lit du json dans le body
app.use(json());

RegisterRoutes(app);

// Créer un endpoint GET
app.get('/hello', 
  (request: Request, response: Response, next: NextFunction) => {
    response.send("<h1>Hello world!</h1>");
  }
);

// app.use('/user', ROUTES_USER);

// Server des fichiers statiques
app.use('/public', Express.static(join('assets')));

// Ajouter un handler pour les erreurs
app.use(DefaultErrorHandler);

// Lancer le serveur
app.listen(PORT,
  () => {
    console.info("API Listening on port " + PORT);
  }
);