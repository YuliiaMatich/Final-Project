# Cooking App
Single page React application that is using Spoonacular API to get recipes, cuisines, ingredients.
User can:
 - browse recipes by cusine/meal type; 
 - search recipes by keyword; 
 - search by various filters (cooking time, calories, diet type);
 - view detailed single recipes;
 - add recipes to favorites;
 - share recipes.

## Setup

Install dependencies with `npm install` in both server and client folders.

## Running Backend from server folder
```sh
npm run dev
```

## Running Frontend from client folder

```sh
npm start
```

## Screenshots
!["Search by keyword"](https://github.com/YuliiaMatich/Final-Project/blob/feature/readme/client/public/screenshots/readme_search.jpg?raw=true)

!["Search by cuisine type"](https://github.com/YuliiaMatich/Final-Project/blob/feature/readme/client/public/screenshots/readme_cuisine.jpg?raw=true)

!["Search by meal type"](https://github.com/YuliiaMatich/Final-Project/blob/feature/readme/client/public/screenshots/readme_mealtype.jpg?raw=true)

!["Single recipe page"](https://github.com/YuliiaMatich/Final-Project/blob/feature/readme/client/public/screenshots/readme_recipe.jpg?raw=true)


## Dependencies (Frontend)
  "@emotion/react": "^11.10.4",
  "@emotion/styled": "^11.10.4",
  "@mui/material": "^5.10.4",
  "@testing-library/jest-dom": "^5.16.5",
  "@testing-library/react": "^13.3.0",
  "@testing-library/user-event": "^13.5.0",
  "axios": "^0.27.2",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-scripts": "5.0.1",
  "web-vitals": "^2.1.4"

## Dependencies (Backend)
  "axios": "^0.27.2",
  "bcrypt": "^5.0.1",
  "bcryptjs": "^2.4.3",
  "cookie-parser": "~1.4.4",
  "cookie-session": "^2.0.0",
  "cors": "^2.8.5",
  "debug": "~2.6.9",
  "dotenv": "^16.0.2",
  "express": "~4.16.1",
  "morgan": "~1.9.1",
  "node-sass-middleware": "^1.0.1",
  "npm-sass": "^3.1.0",
  "pg": "^8.8.0"
  