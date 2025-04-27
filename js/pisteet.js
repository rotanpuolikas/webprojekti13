let teksti = document.getElementById("pisteet")
let pistetaulukko = []
let yhtpist = 0

function calcPoints(){
    pistetaulukko.push(parseInt(sessionStorage.getItem("kirjoitus")) || 0);

    pistetaulukko.push(parseInt(sessionStorage.getItem("historiapeli"))|| 0);

    pistetaulukko.push(parseInt(sessionStorage.getItem("muistipeli")) || 0);

    pistetaulukko.push(parseInt(sessionStorage.getItem("lippupeli")) || 0);

    pistetaulukko.push(parseInt(sessionStorage.getItem("matopeli")) || 0);

    pistetaulukko.forEach(peli => {
        yhtpist += peli
    });
    console.log(yhtpist)

    teksti.innerText = yhtpist

    document.getElementById("kirjoituspeli").innerText = "Pisteet: " + parseInt(sessionStorage.getItem("kirjoitus") || 0)
    document.getElementById("matopeli").innerText = "Pisteet: " + parseInt(sessionStorage.getItem("matopeli") || 0)
    document.getElementById("lippupeli").innerText = "Pisteet: " + parseInt(sessionStorage.getItem("lippupeli") || 0)
    document.getElementById("historiapeli").innerText = "Pisteet: " + parseInt(sessionStorage.getItem("historiapeli") || 0)
    document.getElementById("korttipeli").innerText = "Pisteet: " + parseInt(sessionStorage.getItem("korttipeli") || 0)
    document.getElementById("muistipeli").innerText = "Pisteet: " + parseInt(sessionStorage.getItem("muistipeli") || 0)

}

// puskekaa sessionstorageen pelin pistemäärä tälleen:
// sessionStorage.setItem("pelin nimi", pistemäärä)

// ja lisätkää tänne calcpointsiin tohon pistetaulukko.pushin alle samanlainen
// mut silleen et tuon sessionStorage.getItem("kirjoitus") sijaan kirjoituksessa
// lukee se nimi mitä omassa pelissä käytitte


calcPoints()