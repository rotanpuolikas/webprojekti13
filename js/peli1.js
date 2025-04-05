// kirjotuspeli...
let viimeksi = null;
let kirjaimet = "abcdefghijklmnopqrstuvwxysåäö "
let pooh = null

//texturl = "https://raw.githubusercontent.com/rotanpuolikas/webprojekti13/refs/heads/main/resources/pooh.txt"
texturl = "./resources/pooh.txt"

/*
function getpooh(texturl){
    return fetch(texturl).then(response => {
        if(!response.ok){
            throw new Error("HTTP error " + response.status)
        }
    })
}
*/

function writePooh(pooh){
    console.log(pooh)
}
/*
async function getPooh(texturl){
    try{
        const response = await fetch(texturl)
        if(!response.ok){
            throw new Error("Response status: " + response.status)
        }
        const text = await response.text()
        console.log(text)
        return text
    }
    catch(error){
        console.error(error.message)
    }
}
*/

async function getPooh(texturl){
    let data = await fetch(texturl)
        .then(value =>{
            return value
        })
        .catch(error => {
            console.error(error)
        })
}

pooh = getPooh(texturl)

window.addEventListener("keydown", function (nappi) {
    if (nappi.defaultPrevented){
        return
    }
    writePooh(pooh)
    if(kirjaimet.includes(nappi.key)){
        viimeksi = nappi.key
        kirjota(viimeksi, null)
        return
    }
    else if(nappi.key == "Backspace"){
        kirjota(null, "Backspace")
    }
    else{
        viimeksi = null
        return viimeksi
    }
})

function kirjota(viimeksi, modify){
    teksti = document.getElementById("teksti")
    if(modify == null){
        uusteksti = teksti.innerHTML
        uusteksti += viimeksi
        teksti.innerHTML = uusteksti
    }
    else if(modify == "Backspace"){
        let sis = teksti.innerHTML
        pituus = sis.length
        if(pituus > 0){
        let minus1 = sis.slice(0, -1)
        teksti.innerHTML = minus1
        }
    }
    return
}