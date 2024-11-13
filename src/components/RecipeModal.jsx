/* eslint-disable react/prop-types */
import { useRef, forwardRef, useImperativeHandle } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { updateName, updateIngredients, updateSteps } from '../features/form-input/formInputSlice';

const RecipeModal = forwardRef(function RecipeModal(
  { onAddRecipe, onEditRecipe },
  ref,
) {
  const modalType = useSelector((state) => state.modalType.value);
  const formInput = useSelector((state) => state.formInput);
  const myModal1 = useRef(null);
  const buttonRef = useRef(null);

  const dispatch = useDispatch();

  const ingredientPlaceholder = `Separate each ingredient with a "*"
              
3 tomatoes * 1 cup of sugar * parsley`;

  const stepsPlaceholder = `Separate each step with a "*"
              
In a big glass bowl, mix the dry ingedients. *
Add in the milk slowly while stirring the mix. *
Add the eggs, one by one, and mix for 3 minutes. *`;

  useImperativeHandle(ref, () => {
    return {
      click() {
        buttonRef.current.click();
      },
    };
  }, [buttonRef]);

  return (
    <>
      <button
        ref={buttonRef}
        className="invisible"
        onClick={() => myModal1.current.showModal()}
      ></button>
      <dialog ref={myModal1} id="my_modal_1" className="modal">
        <div className="modal-box min-w-[300px] max-w-md bg-amber-50 text-center text-sm">
          <div>
            <h3 className="text-lg font-bold">
              {modalType === "add" ? "Add a new recipe" : "Edit recipe"}
            </h3>
            <label htmlFor="recipe-name">
              <p className="py-2 font-semibold">Recipe Name</p>
            </label>
            <textarea
              id="recipe-name"
              className="textarea textarea-bordered w-full pt-[0.9rem] leading-tight dark:bg-white"
              rows="1"
              maxLength="20"
              value={formInput.name}
              onChange={(e) => {
                dispatch(updateName(e.target.value))
                  }}
              placeholder="Recipe Name"
              autoFocus="autofocus"
            ></textarea>
            <label htmlFor="ingredients">
              <p className="py-2 font-semibold">Ingredients</p>
            </label>
            <textarea
              id="ingredients"
              className="textarea textarea-bordered w-full leading-tight dark:bg-white"
              rows="3"
              value={formInput.ingredients}
              onChange={(e) => {
                dispatch(updateIngredients(e.target.value))
                  }}
              placeholder={ingredientPlaceholder}
            ></textarea>
            <label htmlFor="steps">
              <p className="py-2 font-semibold">Steps</p>
            </label>
            <textarea
              id="steps"
              className="textarea textarea-bordered w-full leading-tight dark:bg-white"
              rows="5"
              value={formInput.steps}
              onChange={(e) => {
                dispatch(updateSteps(e.target.value))
                  }}
              placeholder={stepsPlaceholder}
            ></textarea>
            <div className="mt-7 flex h-fit w-full flex-none justify-end gap-3">
              {modalType === "add" ? (
                <button
                  onClick={() => {
                    onAddRecipe();
                    myModal1.current.close();
                  }}
                  className="btn bg-lime-400 dark:border-none dark:text-slate-800"
                >
                  Add Recipe
                </button>
              ) : (
                <button
                  onClick={() => {
                    onEditRecipe();
                    myModal1.current.close();
                  }}
                  className="btn bg-lime-400 dark:border-none dark:text-slate-800"
                >
                  Edit Recipe
                </button>
              )}
              <button
                onClick={() => {
                  myModal1.current.close();
                }}
                className="btn bg-red-400 dark:border-none dark:text-slate-800"
              >
                Discard
              </button>
            </div>
          </div>
          <div className="modal-action"></div>
        </div>
      </dialog>
    </>
  );
});

export default RecipeModal;
