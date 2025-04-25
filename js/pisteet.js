let teksti = document.getElementById("pisteet")
let pistetaulukko = []
let yhtpist = 0

function calcPoints(){
    pistetaulukko.push(parseInt(sessionStorage.getItem("kirjoitus")))
    pistetaulukko.push(parseInt(sessionStorage.getItem("muistipeli")) || 0);

    pistetaulukko.forEach(peli => {
        yhtpist += peli
    });
    console.log(yhtpist)

    teksti.innerText = yhtpist
}

// puskekaa sessionstorageen pelin pistemäärä tälleen:
// sessionStorage.setItem("pelin nimi", pistemäärä)

// ja lisätkää tänne calcpointsiin tohon pistetaulukko.pushin alle samanlainen
// mut silleen et tuon sessionStorage.getItem("kirjoitus") sijaan kirjoituksessa
// lukee se nimi mitä omassa pelissä käytitte


calcPoints()