import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./App.css";

// COMPONENTS

import NavBar from "./components/NavBar.jsx";
import RecipeDisplay from "./components/RecipeDisplay.jsx";
import RecipeModal from "./components/RecipeModal.jsx";

// APP

function App() {
  const recipes = useSelector((state) => state.recipes.recipes);
  const modalButton = useRef(null);

  const handleModalClick = () => {
    modalButton.current.click();
  }

  useEffect(() => {
    localStorage.setItem("storedRecipes", JSON.stringify(recipes));
  }, [recipes]);

  return (
    <div className="min-h-screen w-full bg-amber-50 dark:text-slate-800">
      <NavBar onModalClick={handleModalClick} />
      <RecipeDisplay onModalClick={handleModalClick} />
      <RecipeModal ref={modalButton} />
      <p className="pb-8 text-center font-bold">Created by Heber Villalobos</p>
    </div>
  );
}

export default App;
