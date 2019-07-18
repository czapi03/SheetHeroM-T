//some code
document.addEventListener('deviceready', function() {

  // console.log(Media);


  $('document').ready(function() {
    console.log('--app.js--');

    var lvltest = 1;
    var noten = ["c4","d4","e4","f4","g4","a4","h4", "c5","d5","e5","f5","g5","a5","h5", "c6"]



        // window.ubansu = new Game(lvltest, noten, 0.125, 60, 0,1000, "Anfänger", 150)
    // var start = new Game(1, noten, 0.125, 60, 0,1000, "Anfänger", 150);




    $('#mutebutton').on("click",function(){
      console.log("weiter");

      generateNextLevel();

    })

    $('#dialog2 > *').on("click",function(){

      $("#dialog2").css({display:"none"})

    })
    $('#help').on("click",function(){

      $("#dialog2").css({display:"block"})

    })











  })
})
