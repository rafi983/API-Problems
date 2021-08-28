const teamDetail = document.getElementById("team-detail");

const searchTeam = async () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;

  searchField.value = "";
  console.log(searchText);

  const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  loadTeamInfo(data.teams);
};

const loadTeamInfo = (teams) => {
  const teamInfo = document.getElementById("team-info");
  teamInfo.textContent = "";
  teamDetail.textContent = "";
  console.log(teams);

  teams.forEach((team) => {
    const teamDiv = document.createElement("div");
    teamDiv.classList.add("col");
    teamDiv.innerHTML = `
      <div class="card h-100 rounded-2 p-3 shadow-lg" onclick="loadTeamDetail(${team.idTeam})">
            <img src="${team.strTeamBadge}" class="card-img-top" alt="..." />
            <div>
              <h5>${team.strLeague}</h5>   
            </div>
       </div>
    `;
    teamInfo.appendChild(teamDiv);
  });
};

const loadTeamDetail = async (teamDetail) => {
  const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamDetail}`;
  const res = await fetch(url);
  const data = await res.json();
  displayTeamDetail(data.teams[0]);
};

const displayTeamDetail = (teamInDetail) => {
  const teamDetailDiv = document.createElement("div");
  teamDetail.textContent = "";
  teamDetailDiv.innerHTML = `
    <div class="card h-100 rounded-2 p-3 shadow-lg">
           <img src="${teamInDetail.strTeamBadge}" class="card-img-top" alt="..." />
       <div>
          <h5>${teamInDetail.strLeague}</h5>   
       </div>
   </div>
  `;
  teamDetail.appendChild(teamDetailDiv);
};
