 
const navLinks = document.querySelectorAll('header a');
const sections = document.querySelectorAll('section');

navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        
     
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        
        const targetId = this.getAttribute('href').substring(1); 
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.classList.add('active');
        }
    });
});


let driversTableBody = document.getElementById("driver-standings");

fetch('https://api.jolpi.ca/ergast/f1/current/driverStandings.json')
    .then(response => response.json())
    .then(data => {
        let drivers = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        
        driversTableBody.innerHTML = ""; 

        drivers.forEach((driver) => {
            let row = `
                <tr>
                    <td>${driver.position}</td>
                    <td>${driver.Driver.givenName} ${driver.Driver.familyName}</td>
                    <td>${driver.Constructors[0].name}</td>
                    <td>${driver.wins}</td>
                    <td>${driver.points}</td>
                </tr>
            `;
            driversTableBody.innerHTML += row;
        });
    })
    .catch(error => console.error("Error fetching drivers:", error));

let constructorsTableBody = document.getElementById("constructor-standings");

fetch('https://api.jolpi.ca/ergast/f1/current/constructorStandings.json')
    .then(response => response.json())
    .then(data => {
        let constructors = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        
        constructorsTableBody.innerHTML = ""; 

        constructors.forEach((team) => {
            let row = `
                <tr>
                    <td>${team.position}</td>
                    <td>${team.Constructor.name}</td>
                    <td>${team.wins}</td>
                    <td>${team.points}</td>
                </tr>
            `;
            constructorsTableBody.innerHTML += row;
        });
    })
    .catch(error => console.error("Error fetching constructors:", error));
 


    fetch('https://api.jolpi.ca/ergast/f1/current/next.json')
    .then(response => response.json())
    .then(data => {
        const nextRace = data.MRData.RaceTable.Races[0];
        const raceName = nextRace.raceName;
        const raceDate = nextRace.date;
        const raceTime = nextRace.time;
        
        document.getElementById('race-name').innerText = raceName;

        const countDownDate = new Date(`${raceDate}T${raceTime}`).getTime();

        const timer = setInterval(function() {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('countdown').innerText = 
                `${days}d ${hours}h ${minutes}m ${seconds}s`;

            if (distance < 0) {
                clearInterval(timer);
                document.getElementById('countdown').innerText = "RACE STARTED!";
            }
        }, 1000);
    })
    .catch(error => console.error("Error fetching next race:", error));