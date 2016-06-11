'use strict';

//Funcion para seleccionar elementos
function qS(selector) {
  return document.querySelector(selector);
};

/*
var tiny = require('../../bower_components/tiny.js/dist/tiny');
var ch = require('../../bower_components/chico/dist/ui/chico');
*/

// Zoom de producto
var zoom2 = new ch.Zoom(qS('#zoom-preload'));
// Precarga de la misma
zoom2.loadImage();

// Carousel
var carousel = new ch.Carousel(qS('.myCarousel'), { 'pagination': true });
//# sourceMappingURL=main.js.map
