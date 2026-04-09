let video;
let audio;

function setup() {
  createCanvas(500, 400);
  video = createCapture(VIDEO);
  video.size(500, 400);
  video.hide();
  
  audio = new p5.AudioIn();
  audio.start();
  
}

function draw() {
  let volume = audio.getLevel();
  // console.log(volume);
  
  // Applica il color key con il colore verde (0, 255, 0) e threshold di 100
  let keyedVideo = colorKey(video, 255, 0, 0, 150);
  image(keyedVideo, 0, 0);
}

// Funzione colorKey: mantiene i pixel del colore specificato, scarta gli altri
function colorKey(videoFeed, r, g, b, threshold) {
  // Ottiene un'immagine dal video frame
  let imgCopy = videoFeed.get();
  
  // Carica i pixel dell'immagine
  imgCopy.loadPixels();
  
  // Itera su tutti i pixel
  for (let i = 0; i < imgCopy.pixels.length; i += 4) {
    // Estrae i valori RGB del pixel corrente
    let pixelR = imgCopy.pixels[i];
    let pixelG = imgCopy.pixels[i + 1];
    let pixelB = imgCopy.pixels[i + 2];
    
    // Calcola la distanza euclidea dal colore target
    let distance = dist(pixelR, pixelG, pixelB, r, g, b);
    
    // Se la distanza è maggiore del threshold, rende il pixel trasparente
    if (distance > threshold) {
      imgCopy.pixels[i + 3] = 0; // Alpha = 0 (trasparente)
    }
  }
  
  imgCopy.updatePixels();
  return imgCopy;
}
