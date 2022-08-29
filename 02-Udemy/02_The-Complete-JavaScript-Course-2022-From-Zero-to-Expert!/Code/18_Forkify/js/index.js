import * as model from './model.js';
import recipeView from './views/recipeView.js';
console.log('hey');

const recipeContainer = document.querySelector('.recipe');

const timeout = s =>
  new Promise(function (_, reject) {
    setTimeout(
      () =>
        reject(new Error(`Request took too long! Timeout after ${s} second`)),
      s * 1000
    );
  });

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    // if (!id) return;

    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);
    const {recipe} = model.state;

    // 2) Rendering recipe
    recipeView.render(recipe);
  } catch (err) {
    console.error(err);
  }
};

// controlRecipes();

['hashchange', 'load'].forEach(evt =>
  window.addEventListener(evt, controlRecipes)
);

// // https://forkify-api.herokuapp.com/v2

// ///////////////////////////////////////
