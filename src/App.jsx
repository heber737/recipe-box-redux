import {
  useState,
  useEffect,
  useRef
} from "react";

import initialRecipes from "./initial-recipes.js";
import { storageAvailable } from "./functions.js"
import "./App.css";
import { useSelector, useDispatch } from 'react-redux'
import { reset, decrement, selectRecipe } from './features/current-recipe/currentRecipeSlice.js'

// COMPONENTS

import NavBar from "./components/NavBar.jsx";
import RecipeDisplay from "./components/RecipeDisplay.jsx";
import RecipeModal from "./components/RecipeModal.jsx";

// LOCAL STORAGE AVAILABILITY TEST

if (
  storageAvailable("localStorage") &&
  !localStorage.getItem("storedRecipes")
) {
  localStorage.setItem("storedRecipes", JSON.stringify(initialRecipes));
}

// APP

function App() {
  const [recipes, setRecipes] = useState(
    JSON.parse(localStorage.getItem("storedRecipes")),
  );
  const formInput = useSelector((state) => state.formInput);
  const currentRecipe = useSelector((state) => state.currentRecipe.index);

  const dispatch = useDispatch();

  const modalButton = useRef(null);

  function handleRecipeChange(index) {
    dispatch(selectRecipe(index));
  }

  function handleAddRecipe() {
    setRecipes([...recipes, formInput]);
    dispatch(selectRecipe(recipes.length));
  }

  function handleEditRecipe() {
    setRecipes((prev) => {
      return prev.toSpliced(currentRecipe, 1, formInput);
    });
  }

  function handleDeleteRecipe(allow) {
    if (allow) {
      setRecipes((prev) => {
        return prev.toSpliced(currentRecipe, 1);
      });
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
        recipes={recipes}
        onRecipeChange={handleRecipeChange}
        onModalClick={handleModalClick}
      />
      <RecipeDisplay
        recipes={recipes}
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
