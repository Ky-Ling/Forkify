import { async } from "regenerator-runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";
import { MODEL_CLOSE_SEC } from "./config.js";

import "core-js/stable";
import "regenerator-runtime/runtime";


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////////////////////////////////


// if(module.hot) {
//   module.hot.accept();
// };


const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if(!id) return;

    // 0): Update results view to mark selected search result
    resultsView.update(model.getSearchResultPage());
    
    // 1): Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2): Before we load the recipe, we have to render spinner first
    recipeView.renderSpinner();
    
    // 3): Loading recipe
    await model.loadRecipe(id);
    
    // 4): Rendering recipe
    recipeView.render(model.state.recipe);
    
  } catch(err) {
    recipeView.renderError();
  }

};


const controlSearchResults = async function() {
  try {
    resultsView.renderSpinner();
    console.log(resultsView);

    // 1): Get search query
    const query = searchView.getQuery();
    if(!query) return;

    // 2): Load search results
    await model.loadSearchResult(query);

    // 3): Render result
    // console.log(model.state.search.results);
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultPage());


    // 4): Render initial pagination button
    paginationView.render(model.state.search)

  } catch(err) {
    console.log(err);
  }
};


const controlPagination = function(gotoPage) {
    // 1): Render new result
    resultsView.render(model.getSearchResultPage(gotoPage));

    // 2): Render new pagination buttons
    paginationView.render(model.state.search)
};


const controlServings = function(newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}


const controlAddBookmark = function() {

  // 1): Add/remove bookmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // console.log(model.state.recipe);

  // 2): Update recipe view
  recipeView.update(model.state.recipe);

  // 3): Render bookmarks
  bookmarksView.render(model.state.bookmarks);
}


const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = function(newRecipe) {
  try {  
    // console.log(newRecipe);

    // 1: Show loading spinner
    addRecipeView.renderSpinner();

    // 2: Upload the new recipe data
    model.uploadRecipe(newRecipe);

    // 3: Render recipe
    recipeView.render(model.state.recipe);

    // 4: Success message
    addRecipeView.renderMessage();

    // 5: Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // 6: Change ID in URL
    window.history.pushState(null, "", `#${model.state.recipe.id}`);


    // 7: Close form window
    setTimeout(function() {
      addRecipeView.toggleWindow()
    }, MODEL_CLOSE_SEC * 1000);

  } catch(err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
}

const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();

