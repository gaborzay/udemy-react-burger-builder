import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  purchasable: false,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 0.50,
  bacon: 1.00,
  cheese: 0.75,
  meat: 3.00
};

const addIngredient = (state, action) => {
  const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  };

  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
  const updatedIngs = updateObject(state.ingredients, updatedIng);
  const updatedSt = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  };

  return updateObject(state, updatedSt);
};

const updatePurchasable = (state, action) => {
  return updateObject(state, {purchasable: action.purchasable});
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    totalPrice: 4,
    error: false,
    building: false
  });
};

const fetchIngredientsFailed = (state, action) => updateObject(state, {error: true});

const burgerBuilder = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:            return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:         return removeIngredient(state, action);
    case actionTypes.UPDATE_PURCHASABLE:        return updatePurchasable(state, action);
    case actionTypes.SET_INGREDIENTS:           return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:  return fetchIngredientsFailed(state, action);
    default:                                    return state;
  }
};

export default burgerBuilder;