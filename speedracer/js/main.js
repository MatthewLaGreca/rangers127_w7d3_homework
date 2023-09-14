const getVroomVrooms = async (season, round) => {
    console.log(season)
    console.log(round)
    let response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json?authuser=0`)
    console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0])
    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
}

const rankingsList = '.rankings-list'

const createRankings = (position, name, nationality, sponsor, points) => {
    const html = 
    // `<div id=${position} class="card mt-3 mb-3" style="width: 18rem;">
    //     <ul class="list-group list-group-flush" id=${name}>
    //         <li class="list-group-item"> ${position}</li>
    //         <li class="list-group-item"> ${name}</li>
    //         <li class="list-group-item"> ${nationality}</li>    
    //         <li class="list-group-item"> ${sponsor}</li>
    //         <li class="list-group-item"> ${points}</li>
    //     </ul>
    // </div>`
    `<div id=${position} class="row justify-content-evenly">
            <div class="col">
                <p>${position}</p>
            </div>
            <div class="col racer">
                <p>${name}</p>
            </div>
            <div class="col">
                <p>${nationality}</p>
            </div>
            <div class="col">
                <p>${sponsor}</p>
            </div>
            <div class="col">
                <p>${points}</p>
            </div>
        </div>`
    document.querySelector(rankingsList).insertAdjacentHTML('beforeend', html)
}

const loadData = async(season, round) => {
    const racers = await getVroomVrooms(season, round)
    for (let i = 0; i<7; i++) {
        createRankings(racers[i].position, racers[i].Driver.givenName + " " + racers[i].Driver.familyName, racers[i].Driver.nationality, racers[i].Constructors[0].constructorId, racers[i].points)
    }
    // racers.forEach(element => createRankings(element.position, element.Driver.givenName + " " + element.Driver.familyName, element.Driver.nationality, element.Constructors[0].constructorId, element.points))
}

const clearData = () => {
    document.querySelector(rankingsList).innerHTML = ''
}

const generateRankings = () => {
    clearData()
    let seasonRound = grabSeasonRound()
    loadData(seasonRound[0],seasonRound[1])
}

function grabSeasonRound () {
    let seasonRound = ['season','round']
    seasonRound[0] = document.getElementById('season').innerHTML
    seasonRound[1] = document.getElementById('round').innerHTML
    return seasonRound
}