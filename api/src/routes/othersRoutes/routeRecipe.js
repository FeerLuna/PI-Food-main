const { Router } = require('express');
const { getALLRecipes } = require("../../controllers/recipes");
const { Recipe, Diet } = require("../../db");

const router = Router();


router.get("/", async (req, res) => {
    const { name } = req.query;
    let allInfo = await getALLRecipes();

    if (name) {
        try {
            let filteredRecipe = await allInfo.filter((e) => e.name.toLowerCase().includes(name.toLowerCase())
            );
            filteredRecipe.length
                ? res.status(200).send(filteredRecipe)
                : res.status(404).send("We couldn't find a recipe with that name")
        } catch (error) {
            return res.status(400).send("something is bad")
        }
    } else {
        res.send(allInfo);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const recipesTotal = await getALLRecipes();
        
        if (id) {
            let recipeId = await recipesTotal.filter((r) => r.id == id);
            if(recipeId.length) res.status(200).json(recipeId)
        }
    } catch (error) {
        res.status(404).send(error, "We couldn't find this recipe")
    }
});

module.exports = router;