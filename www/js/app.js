//some code
// show error on mobile
window.onerror = function( err ) {
  console.log( err );
  return true;
}
console.log = function(s) {
    $( '#debug').html(s).css({padding:10});
}
document.addEventListener('deviceready', function() {


  $('document').ready(function() {
    console.log('app.js');





    // x,y,width,height,color
    // var rect1 = new Background(0, 0, $(window).width(), $(window).height(), "#a09d9a");

    var pianoclick = new PianoOnClick();

    $('defs > path').on("click",function(){
      $(this).toggleClass('blue')
    })


  })
})
