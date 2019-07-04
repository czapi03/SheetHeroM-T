//some code

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




document.addEventListener('deviceready', function() {

// console.log(Media);


  $('document').ready(function() {
    console.log('app.js');


    $('.pianoOnClick').on("click",function(){
      $(this).toggleClass('blue')
    })



    var pianoclick = new PianoOnClick();
    var game = new Game();
    // var move = new MoveNote();
    var start = new StartOnClick();






  })
})
