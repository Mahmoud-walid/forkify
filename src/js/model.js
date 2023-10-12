import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, KEY } from './config';
// import { getJSON, sendJSON } from './helpers';
import { AJAX } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    perPage: RES_PER_PAGE,
    page: 1,
  },
  bookMarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    servings: recipe.servings,
    ingredients: recipe.ingredients,
    imageUrl: recipe.image_url,
    cookingTime: recipe.cooking_time,
    sourceUrl: recipe.source_url,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const recipeLoad = async function (recipeID) {
  try {
    const data = await AJAX(`${API_URL}${recipeID}?key=${KEY}`);
    // console.log(data);
    state.recipe = createRecipeObject(data);

    if (state.bookMarks.some(bookmark => bookmark.id === recipeID)) {
      state.recipe.bookMarked = true;
    } else state.recipe.bookMarked = false;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    console.log(data);
    state.search.results = data.data.recipes.map(ele => {
      return {
        id: ele.id,
        title: ele.title,
        publisher: ele.publisher,
        imageUrl: ele.image_url,
        ...(ele.key && { key: ele.key }),
      };
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSearchResultePage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.perPage;
  const end = page * state.search.perPage;
  console.log(start, end);
  return state.search.results.slice(start, end);
};

export const updateServings = function (numberServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * numberServings) / state.recipe.servings;
  });
  state.recipe.servings = numberServings;
  console.log(state);
};

const persistBookMark = function () {
  localStorage.setItem('bookMarks', JSON.stringify(state.bookMarks));
};

export const addBookMark = function (recipe) {
  state.bookMarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookMarked = true;

  persistBookMark();
};

export const deleteBookMark = function (id) {
  console.log(id);
  const index = state.bookMarks.findIndex(ele => ele.id === id);
  state.bookMarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookMarked = false;

  persistBookMark();
};

const init = function () {
  const storage = localStorage.getItem('bookMarks');
  if (storage) state.bookMarks = JSON.parse(storage);
};
init();

export const UploadRecipe = async function (newRecipe) {
  try {
    // ` Object.entries ` convert object to array
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].includes('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArray = ing[1].split(',').map(ele => ele.trim());
        if (ingArray.length !== 3)
          throw new Error(`Wrong ingredient format, use correct format`);
        const [quantity, unit, description] = ingArray;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    console.log(ingredients);

    console.log(newRecipe);
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    console.log(recipe);

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookMark(state.recipe);
  } catch (error) {
    //
    throw error;
  }
};
