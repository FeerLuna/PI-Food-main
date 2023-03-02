const { Router } = require('express');

//Importar todos los routers;
//Ejemplo: const authRouter = require('./auth.js');
const routeRecipe = require("../routes/othersRoutes/routeRecipe");
const routeDiet = require("../routes/othersRoutes/routeDiet");
const routePostRecipe = require("../routes/othersRoutes/postRecipe");

const router = Router();

//Configurar los routers
//Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", routeRecipe);
router.use("/diets", routeDiet);
router.use("/recipes", routePostRecipe);

module.exports = router;
