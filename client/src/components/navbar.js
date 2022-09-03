import React from 'react';

const Navbar = function () {
  return (
    <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" style={{"margin-left":"2rem"}}>Cooking App</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Meal Type
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Main course</a></li>
            <li><a class="dropdown-item" href="#">Salad</a></li>
            <li><a class="dropdown-item" href="#">Appetizer</a></li>
            <li><a class="dropdown-item" href="#">Dessert</a></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Cuisine
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">American</a></li>
            <li><a class="dropdown-item" href="#">European</a></li>
            <li><a class="dropdown-item" href="#">Middle Eastern</a></li>
            <li><a class="dropdown-item" href="#">Southern</a></li>
            
          </ul>
          
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="#">Recipe With My Ingredients</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="#">Favorites</a>
        </li>
      </ul>
    </div>
  </div>
  <ul class="navbar-nav">
  <li >
  <a class="nav-link active" href="#">Login</a>
  </li>
  <li >
  <a class="nav-link active" style={{"margin-right":"2rem"}} href="#">Registration</a>
  </li>
  </ul>
</nav>
  );
}

export default Navbar;