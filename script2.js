// Array con le location di drop in stile Fortnite
const dropLocations = [
    "Moli Maleodoranti",
    "Rospi Sommersi",
    "Muschi Magici",
    "Dojo Demoniaco",
    "Pompaggio Potente",
    "Sponde Smarrite",
    "Vagoni Violenti",
    "Scorcio Scintillante",
    "Selva Notturna",
    "Chiusa Volpina",
    "Distesa Spezzata",
    "Borgo Della Baia",
    "Garitta Del Guerriero",
    "Fabbrica Kappa Kappa",
    "Burd",
    "Canyon Convergenti",
    "Macchia Mascherata",
    "Alture Ambiziose",
    "Sosta Dello Shogun"
  ];
  
  // Selezione degli elementi dal DOM
  const dropButton = document.getElementById('dropButton');
  const resultDiv = document.getElementById('result');
  
  // Evento click per generare una location casuale
  dropButton.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * dropLocations.length);
    const selectedDrop = dropLocations[randomIndex];
    resultDiv.textContent = selectedDrop;
  });
  