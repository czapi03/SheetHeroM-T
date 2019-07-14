//some code

document.addEventListener('deviceready', function() {

  // console.log(Media);


  $('document').ready(function() {
    console.log('--app.js--');

    var noten = ["c4", "c5", "f5", "c6", "e4", "h5"]








    // var pianoclick = new PianoOnClick();
    // var move = new MoveNote();
    var start = new Game(1, noten, 0.25, 60, 0, "Anfänger", 150);

    $('.pianoOnClick').on("click", function() {
      $(this).toggleClass('blue')




    })





  })
})
