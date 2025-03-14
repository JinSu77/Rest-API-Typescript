"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const body_parser_1 = require("body-parser");
const error_handler_middleware_1 = require("./utility/error/error-handler.middleware");
const routes_1 = require("./routes/routes");
// import * as swaggerUi from "swagger-ui-express";
const db_1 = require("./utility/ORM/db");
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
// Récupérer le port des variables d'environnement ou préciser une valeur par défaut
const PORT = process.env.PORT || 5050;
// Créer l'objet Express
const app = (0, express_1.default)();
app.get('/info', async (request, response, next) => {
    try {
        const db = db_1.DB.Connection;
        await db.query('SELECT 1');
        response.json({
            status: 'UP',
            database: 'Connected',
            timestamp: new Date().toISOString()
        });
    }
    catch (error) {
        response.status(500).json({
            status: 'DOWN',
            database: 'Disconnected',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});
// // Servir le contenu static du dossier `public`
// app.use(Express.static("public"));
// // Créer une route qui permet de convertir le .json en format html
// app.use(
//   "/docs",
//   swaggerUi.serve,
//   swaggerUi.setup(undefined, {
//     swaggerOptions: {
//       url: "/swagger.json",
//     },
//   })
// );
// Ajouter un 'middleware' lit du json dans le body
app.use((0, body_parser_1.json)());
(0, routes_1.RegisterRoutes)(app);
// Créer un endpoint GET
app.get('/hello', (request, response, next) => {
    response.send("<h1>Hello world!</h1>");
});
// app.use('/user', ROUTES_USER);
// Server des fichiers statiques
app.use('/public', express_1.default.static((0, path_1.join)('assets')));
// Ajouter un handler pour les erreurs
app.use(error_handler_middleware_1.DefaultErrorHandler);
// Lancer le serveur
app.listen(PORT, () => {
    console.info("API Listening on port " + PORT);
});
