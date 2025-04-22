const sanat = [
    { en: "Cat", fi: "Kissa" },
    { en: "Dog", fi: "Koira" },
    { en: "Sun", fi: "Aurinko" },
    { en: "Ball", fi: "Pallo" },
    { en: "Train", fi: "Juna" },
    { en: "Book", fi: "Kirja" },
    { en: "House", fi: "Talo" },
    { en: "Car", fi: "Auto" },
    { en: "Bird", fi: "Lintu" },
    { en: "Fish", fi: "Kala" }
  ];
  
  let nykyinenIndeksi = 0;
  
  const kortti = document.getElementById("kortti");
  
  kortti.addEventListener("click", () => {
    const sana = sanat[nykyinenIndeksi];
    kortti.innerHTML = `<strong>${sana.en}</strong><br><small>${sana.fi}</small>`;
    nykyinenIndeksi++;
  
    if (nykyinenIndeksi >= sanat.length) {
      nykyinenIndeksi = 0;
    }
  });

  function lausu(sana) {
  const utterance = new SpeechSynthesisUtterance(sana);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}

kortti.addEventListener("click", () => {
  const sana = sanat[nykyinenIndeksi];
  kortti.innerHTML = `<strong>${sana.en}</strong><br><small>${sana.fi}</small>`;
  lausu(sana.en); // ← uusi lisäys

  nykyinenIndeksi++;
  if (nykyinenIndeksi >= sanat.length) {
    nykyinenIndeksi = 0;
  }
});