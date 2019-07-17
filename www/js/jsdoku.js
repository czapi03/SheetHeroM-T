console.log('--JSdoku--');


//HILFSFUNKTION: SVG element mit Namespace erzeugen, da Jquery nicht fähig.
$.svg = function( tag ) {
  return $( document.createElementNS( 'http://www.w3.org/2000/svg', tag ) );
}
//-------------------------------------------------------------------------

//Mathrandom
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//console log mobile
// window.onerror = function(err) {
//   console.log(err);
//   return true;
// }
// console.log = function(s) {
//   $("<div>").html(s).css({
//     padding: 5,
//     "background": "#e57b7b"
//   }).appendTo('#debug')
// }

//Nächstes LVl generieren
function generateNextLevel(){
  $('#dialog').css({display:"none"})
  start = null;

}
