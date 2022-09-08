import React from "react";

const backend = {
  id: 637631,
  title: "Cheesy Bacon Burger with Spicy Chipotle Aiolo Sauce",
  image: "https://spoonacular.com/recipeImages/637631-556x370.jpg",
  readyInMinutes: 45,
  servings: 4,
  cuisine: "American",
  dishType: "lunch",
  ingredients: [
    "2 teaspoons Chopped Chipotle Chiles In Adobo",
    "3 Tablespoons Fat Free Mayonnaise",
    "1 clove garlic, pressed or grated",
    "¼ teaspoons Garlic Powder",
    "3 Tablespoons Greek Yogurt, Non-fat",
    "1 cup Green Bell Pepper, Sliced Into Strips",
    "½ teaspoons Ground Cumin",
    "¼ teaspoons Ground Black Pepper",
    "1 1/2 pounds lean ground beef",
    "4 teaspoons Lime Juice, Fresh",
    "½ cups Onion, Sliced Into Strips",
    "2 whole Wedges Of Laughing Cow Swiss Cheese, Sliced In Half",
    "4 slices Turkey Bacon, Cooked According To Package",
    "4 whole Wheat Hamburger Buns"
  ],
  steps: [
    "For Burgers:In a pan cook turkey bacon according to directions on package.Once bacon is done being cooked, take the bacon out and set aside.",
    "Add bell pepper and onion into same pan, cook until tender about 10 minutes.",
    "Add ground beef to a small bowl, add garlic powder and ground pepper, mix well.Divide the raw meat into 8 equal pieces (I used my scale to measure into 2oz each piece). Flatten out the hamburger, and place 1/2 a cheese wedge onto each piece of hamburger. Take the other pieces of the hamburger and place on top of the cheese , and squish them togther and seal the edges so the cheese doesnt ozzz out.",
    "Place on grill and cook until done. About 5 minutes per side.",
    "Place burger on buns, top the burgers with bacon, peppers & onions and sauce.For Spicy Chipotle Aiolo Sauce:In a small bowl place all the ingredients together and wisk together until combined.Makes 3/4 cups or 12 Tablespoons"
  ]
}

const Recipe = function () {
  return (
    <div className="single-recipe-page">
      <div className="recipe-title-photo">
        <h1 className="single-recipe-page-text">{backend.title}</h1>
        <img className="single-recipe-page-image" src={backend.image} />
      </div>
      <div className="recipe-features">
        <h5>Ready In Minutes: {backend.readyInMinutes}</h5>
        <h5>Servings: {backend.servings}</h5>
        <h5>Cuisine: {backend.cuisine}</h5>
        <h5>Dish Type: {backend.dishType}</h5>
      </div>
      <div className="ingredients-instructions">
        <div className="ingredients">
          <h1>Ingredients</h1>
          {backend.ingredients.map(item => <p>- {item}</p>)}
        </div>
        <div className="instructions">
        <h1>Instructions</h1>
       {backend.steps.map(item => <p>- {item} </p>)} 
        </div>
      </div>
    </div>
  )
}

export default Recipe;