// kirjotuspeli...
let viimeksi = null;
let kirjaimet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖabcdefghijklmnopqrstuvwxysåäö ,."
let pooh = ""
let globalpooh = "" //välttelin typerää return ongelmaa tekemällä tästä globaalin muuttujan... ei ole optimi mutta tällä pärjätään

let kohta = -1

//texturl = "https://raw.githubusercontent.com/rotanpuolikas/webprojekti13/refs/heads/main/resources/pooh.txt"
texturl = "./resources/pooh.txt"


async function getPooh(texturl){ //haetaan paikallisesta tekstitiedostosta tuo data
    await fetch(texturl)
        .then(response => response.text())
        .then(text => {
            globalpooh = text
            writePooh(globalpooh)
        })
        .catch(error => {
            console.error(error)
        })
}

getPooh(texturl)



/*
globalpooh = "testi testi" //testi :)
writePooh(globalpooh)
*/


function writePooh(pooh){
    /*
    teksti = document.getElementById("field")
    teksti.innerHTML = pooh
    */
    tekstialue = document.getElementById("field")
    tekstialue.textContent = null

    let index = 0
    //ähhh se piti tehä tälleen et jaetaan kaikki charit omiin spaneihin, muuten ei onnistu yksittäisten merkkien värjääminen, samalla laitetaan niille kaikille index attribute et voiaan trackata missä mennään
    pooh.split('').forEach(char => {
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
    harjoitus = globalpooh.split('') //tätä ei tarvis joka kerta tehä uusiksi mut ei se kyl performanceakaan haittaa nii sama olla
    
    if(modify == null){ // jos kirjain
        if(kohta < globalpooh.length - 1){
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
    return
}