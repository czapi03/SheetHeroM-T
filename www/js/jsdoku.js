console.log('JSdoku');


//HILFSFUNKTION: SVG element mit Namespace erzeugen, da Jquery nicht fähig.
$.svg = function( tag ) {
  return $( document.createElementNS( 'http://www.w3.org/2000/svg', tag ) );
}
//-------------------------------------------------------------------------
