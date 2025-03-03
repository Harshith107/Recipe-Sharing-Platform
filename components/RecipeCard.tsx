import React from "react";

export default function RecipeCard({ recipe, onDelete }: any) {
  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">{recipe.title}</h2>
      <p>{recipe.description}</p>
      <button onClick={() => onDelete(recipe._id)}>🗑️ Delete</button>
    </div>
  );
}
