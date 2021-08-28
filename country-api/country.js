const loadCountries = () => {
  fetch("https://restcountries.eu/rest/v2/all")
    .then((res) => res.json())
    .then((data) => displayCountries(data));
};

loadCountries();

const displayCountries = (countries) => {
  const countriesContainer = document.getElementById("countries");

  countries.forEach((country) => {
    const countriesDiv = document.createElement("div");
    countriesDiv.classList.add("col");

    countriesDiv.innerHTML = `
       <div class="card h-100 rounded-2 p-3 shadow-lg">
            <div class="image">
               <img src="${country.flag}"  class="card-img-top" alt="..." />  
            </div> 
            <div class="body mt-2">
                  <h5>Name: ${country.name}</h5>
                  <h5>Captital: ${country.capital}</h5>
                  <h5>Population: ${country.population}</h5>
                  <h5>Currencies: ${country.currencies[0].symbol}</h5>
                  <button onclick="loadCountryByName('${country.name}')" class="btn btn-warning px-4">Detail</button>
            </div>
       </div> 
    `;

    countriesContainer.appendChild(countriesDiv);
  });
};

const loadCountryByName = (name) => {
  const url = `https://restcountries.eu/rest/v2/name/${name}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCountryDetail(data[0]));
};

const displayCountryDetail = (detail) => {
  const countryDetail = document.getElementById("country-detail");
  countryDetail.innerHTML = `
     <div>
       <div class="image">
          <img src="${detail.flag}"  class="card-img-top" alt="..." />  
     </div> 
       <div class="body mt-2">
             <h5>Name: ${detail.name}</h5>
             <h5>Captital: ${detail.capital}</h5>
             <h5>Population: ${detail.population}</h5>
             <h5>Currencies: ${detail.currencies[0].symbol}</h5>          
       </div>
  </div> 
`;
};
