const recipieDetail = document.getElementById("recipie-detail");

const searchFood = async () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;

  searchField.value = "";

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  loadRecipie(data.meals);
};

const loadRecipie = (foods) => {
  const recipieContainer = document.getElementById("recipies");
  recipieContainer.textContent = "";
  recipieDetail.textContent = "";

  foods.forEach((food) => {
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

const loadRecipieById = async (foodId) => {
  console.log(foodId);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;

  const res = await fetch(url);
  const data = await res.json();
  loadRecipieDetail(data.meals[0]);
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
