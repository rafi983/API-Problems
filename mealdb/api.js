const recipieDetail = document.getElementById("recipie-detail");

const searchFood = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;

  searchField.value = "";
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => loadRecipie(data.meals));
};

const loadRecipie = (foods) => {
  const recipieContainer = document.getElementById("recipies");
  recipieContainer.textContent = "";
  recipieDetail.textContent = "";
  //   console.log(foods);

  foods.forEach((food) => {
    // console.log(food);
    const recipieDiv = document.createElement("div");

    recipieDiv.classList.add("col");
    recipieDiv.innerHTML = `
      <div class="card h-100 rounded-2 p-3 shadow-lg" onclick="loadRecipieById(${
        food.idMeal
      })">
          <img src="${food.strMealThumb}" class="card-img-top" alt="..." />
          <div>
            <h5>${food.strMeal}</h5>
            <p>${food.strInstructions.slice(0, 200)}</p>
          </div>
     </div>
  `;
    recipieContainer.appendChild(recipieDiv);
  });
};

const loadRecipieById = (foodId) => {
  console.log(foodId);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => loadRecipieDetail(data.meals[0]));
};

const loadRecipieDetail = (foodDetail) => {
  recipieDetail.textContent = "";

  const recipieDetailDiv = document.createElement("div");

  recipieDetailDiv.classList.add("col");
  recipieDetailDiv.innerHTML = `
      <div class="card h-100 rounded-2 p-3 shadow-lg">
          <img src="${
            foodDetail.strMealThumb
          }" class="card-img-top recipie-img" alt="..." />
          <div>
            <h5>${foodDetail.strMeal}</h5>
            <p>${foodDetail.strInstructions.slice(0, 200)}</p>
          </div>
     </div>
  `;
  recipieDetail.appendChild(recipieDetailDiv);
};
