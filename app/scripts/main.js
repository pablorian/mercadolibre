console.log('\'Allo \'Allo!');

//Funcion para seleccionar elementos
function qS(selector) { return document.querySelector(selector); };

// Zoom de producto
var zoom2 = new ch.Zoom(qS('#zoom-preload'));
// Precarga de la misma
zoom2.loadImage();

// Carousel
var carousel = new ch.Carousel(qS('.myCarousel'), {"pagination": true});