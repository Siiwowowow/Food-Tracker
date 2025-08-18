import React, { useState } from "react";

const RecipeSuggestions = () => {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleSearch = () => {
    if (ingredient.trim()) {
      setRecipes([
        `${ingredient} Curry`,
        `${ingredient} Soup`,
        `${ingredient} Fry`
      ]);
      setIngredient("");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-3">🍳 রেসিপি সাজেশন</h2>
      <input
        type="text"
        placeholder="উপকরণের নাম লিখুন..."
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        className="border rounded p-2 w-full mb-2"
      />
      <button
        onClick={handleSearch}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        খুঁজুন
      </button>

      <ul className="mt-3">
        {recipes.map((recipe, idx) => (
          <li key={idx} className="text-sm border-b py-1">
            {recipe}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeSuggestions;
