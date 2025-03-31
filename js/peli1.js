// kirjotuspeli...
let viimeksi = null;
let kirjaimet = "abcdefghijklmnopqrstuvwxysåäö "


window.addEventListener("keydown", function (nappi) {
    if (nappi.defaultPrevented){
        return
    }

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