// kirjotuspeli...
let viimeksi = null;
let kirjaimet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖabcdefghijklmnopqrstuvwxysåäö ,.1234567890!?:;-"
let Task = ""
let globalTask = "" //välttelin typerää return ongelmaa tekemällä tästä globaalin muuttujan... ei ole optimi mutta tällä pärjätään

let kohta = -1

let virheet = 0

//texturl = "https://raw.githubusercontent.com/rotanpuolikas/webprojekti13/refs/heads/main/resources/Task.txt"
texturl = "./resources/pooh.txt"

tasks = ["Harjoittelen kymmensormijärjestelmää! Olen kohta mestari!", "Katso äiti, minä kirjoitan tietokoneella!", "Rakastan kissoja, sillä ne ovat todella söpöjä.", "Kirjoitusvirheitä löytyy kaikkialta, jopa täsät lauseesta!", "Mitäköhän Muumimamman vaapukkamehu sisältää?", "Vapaa-ajallani kuuntelen musiikkia ja pelaan videopelejä.", "Osaatko navigoida Pisteet-sivulle? Sieltä näet yhteispisteesi!", "Vielä jotakin pitäisi keksiä tähän, mahdoton tehtävä"]

/*
async function getTask(texturl){ //haetaan paikallisesta tekstitiedostosta tuo data
    await fetch(texturl)
        .then(response => response.text())
        .then(text => {
            globalTask = text
            writeTask(globalTask)
        })
        .catch(error => {
            console.error(error)
        })
}
        // legacy, tätä ei enää käytetä, ei ollut käytännöllistä
        */

//getTask(texturl)
randomTask(tasks)

function randomTask(tasks){
    /*
    i = 0
    tasks.forEach(task => {
        i+=1
    });
    */
    randomize = Math.floor(Math.random() * tasks.length)
    globalTask = tasks[randomize]
    console.log(globalTask)
    writeTask(globalTask)
}



/*
globalTask = "testi testi" //testi :)
writeTask(globalTask)
*/


function writeTask(task){
    /*
    teksti = document.getElementById("field")
    teksti.innerHTML = Task
    */
    tekstialue = document.getElementById("field")
    tekstialue.textContent = null

    let index = 0
    //ähhh se piti tehä tälleen et jaetaan kaikki charit omiin spaneihin, muuten ei onnistu yksittäisten merkkien värjääminen, samalla laitetaan niille kaikille index attribute et voiaan trackata missä mennään
    task.split('').forEach(char => {
        let merkki = document.createElement("span")
        merkki.innerText = char
        merkki.setAttribute("index", index)
        tekstialue.appendChild(merkki)
        index += 1
    })
}


window.addEventListener("keydown", function (nappi) {
    if (nappi.defaultPrevented){
        return //idk dokumentaatiossa sanottiin et tää pitää olla, en tiiä mitä tekee mut varmaan tärkee
    }
    if(kirjaimet.includes(nappi.key)){
        viimeksi = nappi.key
        kirjota(viimeksi, null)
        return
    }
    else if(nappi.key == "Backspace"){
        kirjota(null, "Backspace")
    }
    else{ // jos tapahtuu jotain outoa nii ei tehä mitään
        viimeksi = null
        return viimeksi
    }
})

function kirjota(viimeksi, modify){ // en tiiä miks päätin tehä tän kahella eri inputilla mut i quess selkeempi?
    teksti = document.getElementById("teksti")
    harjoitus = globalTask.split('') //tätä ei tarvis joka kerta tehä uusiksi mut ei se kyl performanceakaan haittaa nii sama olla
    
    if(modify == null){ // jos kirjain
        if(kohta < globalTask.length - 1){
            kohta += 1
            oikeemerkki = harjoitus[kohta]
            merkkiclass = document.querySelector("[index=" + CSS.escape(kohta) + "]") //tässä se maaginen index tulee hyötyyn
            if(viimeksi === oikeemerkki){ //merkki oikein, väri vihreeksi
                merkkiclass.classList.add("correct")
                merkkiclass.classList.remove("incorrect")
            }
            else if(viimeksi != oikeemerkki){ // merkki väärin, väri punaseks
                merkkiclass.classList.add("incorrect")
                merkkiclass.classList.remove("correct")
                virheet += 1
            }
        }
    }
    else if(modify == "Backspace"){ // jos backspace
        merkkiclass = document.querySelector("[index=" + CSS.escape(kohta) + "]")
        merkkiclass.classList.remove("correct") // poistetaan kaikki värit siit current merkistä ja siirrytää taaksepäi
        merkkiclass.classList.remove("incorrect")
        if(kohta > -1){
            kohta -= 1
        }

    }

    if (kohta == globalTask.length - 1){
        const pistespan = document.getElementById("pistespan")
        storagepisteet = parseInt(sessionStorage.getItem("kirjoitus")) || 0
        pisteet = calculatePoints(virheet)
        if(pisteet + storagepisteet >= 10){
            pisteet = 10
        }
        else{
            pisteet = pisteet + storagepisteet
        }
        pistespan.innerText = "teit yhteensä " + virheet + " virhettä. Yhteispisteet: " + pisteet
        sessionStorage.setItem("kirjoitus", pisteet)
    }
    return
}

function calculatePoints(virhe){
    // on ruma mutta toimii
    if(virhe <= 1){return 2}
    else if(virhe <= 5){return 1}
    else{return 0}
}