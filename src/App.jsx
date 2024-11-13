import {
  useEffect,
  useRef
} from "react";

import "./App.css";
import { useSelector, useDispatch } from 'react-redux'
import { reset, decrement, selectRecipe } from './features/current-recipe/currentRecipeSlice.js'
import { addRecipe, editRecipe, deleteRecipe } from './features/recipes/recipesSlice.js'

// COMPONENTS

import NavBar from "./components/NavBar.jsx";
import RecipeDisplay from "./components/RecipeDisplay.jsx";
import RecipeModal from "./components/RecipeModal.jsx";

// APP

function App() {

  const recipes = useSelector((state) => state.recipes.recipes);
  const formInput = useSelector((state) => state.formInput);
  const currentRecipe = useSelector((state) => state.currentRecipe.index);

  const modalButton = useRef(null);

  const dispatch = useDispatch();

  function handleRecipeChange(index) {
    dispatch(selectRecipe(index));
  }

  function handleAddRecipe() {
    dispatch(addRecipe(formInput));
    dispatch(selectRecipe(recipes.length));
  }

  function handleEditRecipe() {
    dispatch(editRecipe({
      currentRecipe,
      formInput
    }))
  }

  function handleDeleteRecipe(allow) {
    if (allow) {
      dispatch(deleteRecipe(currentRecipe));
      if (currentRecipe == 0) {
        dispatch(reset());
      } else {
        dispatch(decrement());
      }
    }
  }

  function handleModalClick() {
    modalButton.current.click();
  }

  useEffect(() => {
    localStorage.setItem("storedRecipes", JSON.stringify(recipes));
  }, [recipes]);

  return (
    <div className="min-h-screen w-full bg-amber-50 dark:text-slate-800">
      <NavBar
        onRecipeChange={handleRecipeChange}
        onModalClick={handleModalClick}
      />
      <RecipeDisplay
        onModalClick={handleModalClick}
        onDeleteRecipe={handleDeleteRecipe}
      />
      <RecipeModal
        onAddRecipe={handleAddRecipe}
        onEditRecipe={handleEditRecipe}
        ref={modalButton}
      />
      <p className="pb-8 text-center font-bold">Created by Heber Villalobos</p>
    </div>
  );
}

export default App;
