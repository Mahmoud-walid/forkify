'use strict';

import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookMarksView from './views/bookMarksView.js';
import paginationView from './views/paginationView.js';
import addMyRecipeView from './views/addMyRecipeView.js';

// import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime.js';

// if (module.hot) {
//   module.hot.accept();
// };

const showRecipe = async function () {
  try {
    const recipeID = window.location.hash.slice(1);
    // console.log(recipeID);

    if (!recipeID) return;
    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultePage());
    bookMarksView.update(model.state.bookMarks);

    await model.recipeLoad(recipeID);

    recipeView.render(model.state.recipe);
  } catch (error) {
    console.error(error);
    recipeView.renderError(error);
  }
};

export const controlSearch = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResult(query);
    // resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResultePage(1));

    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
    resultsView.renderError(error);
  }
};

const addHandlerPagination = function (numberPage) {
  resultsView.render(model.getSearchResultePage(numberPage));

  paginationView.render(model.state.search);
};

const controlServings = function (numberServings = 4) {
  model.updateServings(numberServings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookMark = function () {
  if (!model.state.recipe.bookMarked) model.addBookMark(model.state.recipe);
  else {
    model.deleteBookMark(model.state.recipe.id);
  }
  // console.log(model.state);
  recipeView.update(model.state.recipe);

  bookMarksView.render(model.state.bookMarks);
};

const controlBookMarks = function () {
  bookMarksView.render(model.state.bookMarks);
};

const controlAddMyRecipe = async function (newRecipe) {
  try {
    await model.UploadRecipe(newRecipe);
    console.log(model.state.recipe);

    recipeView.render(model.state.recipe);
    addMyRecipeView.renderMessage(`Recipe was succesfully uploaded`);

    bookMarksView.render(model.state.bookMarks);
    // window.history.pushState(state, '', url)
    window.history.pushState(null, "", `3${model.state.recipe.id}`)

    setTimeout(() => {
      addMyRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    console.error('😂', error);
    addMyRecipeView.renderError(error);
  }
};

const init = () => {
  bookMarksView.addHandlerRender(controlBookMarks);
  recipeView.addHandelerRender(showRecipe);
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerPagination(addHandlerPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookMark(controlAddBookMark);
};

addMyRecipeView.addHandlerCloseWindow();
addMyRecipeView.addHandlerUpload();
addMyRecipeView.addHandlerShowWindow();
addMyRecipeView.addHandlerUpload(controlAddMyRecipe);
init();

// Object.defineProperty(window, 'x', {
//   get: function () {
//     return [];
//   },
// });
// console.log(x !== x);

// const test = {
//   user: "mahmoud",
//   number: "010",
//   addres: "mans",
//   graduate: "FCIS",
//   friends: ['1', '2', '3', '4', '5']
// }

// const arr = Object.entries(test)
// console.log(arr);
// console.log(Object.fromEntries(arr));

// console.log(arr);
