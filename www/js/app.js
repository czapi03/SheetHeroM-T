//some code
document.addEventListener('deviceready', function() {

  // console.log(Media);


  $('document').ready(function() {
    console.log('--app.js--');
    var lvliterator = 0;


    $.getJSON("js/game/levelcollection.json", function(levelcol) {
      console.log(levelcol);

        var currentlvl = levelcol[0].lvl;
        var currentnoten = levelcol[0].noten;
        var currentspeed = levelcol[0].speed;
        var currentduration = levelcol[0].duration;
        var currenthighscore = levelcol[0].highscore;




        var start = new Game(currentlvl, currentnoten, currentspeed, currentduration, 0,currenthighscore, "Anfänger", 150);


        $('#nextlvl > *').on("click", function() {
          $('#dialog').css({display:"none"})
          console.log("weiter");
          lvliterator++;
          if(lvliterator > 10){
            alert("Spiel durchgespielt")
          }

          var startnextlvl = new Game(levelcol[lvliterator].lvl, levelcol[lvliterator].noten,levelcol[lvliterator].speed, levelcol[lvliterator].duration, 0,levelcol[lvliterator].highscore, "Anfänger", 150)


        })


    });




    // window.ubansu = new Game(lvltest, noten, 0.125, 60, 0,1000, "Anfänger", 150)




//weiterbutton


//popuprechts

    $('#dialog2 > *').on("click", function() {

      $("#dialog2").css({
        display: "none"
      })

    })
    $('#help').on("click", function() {

      $("#dialog2").css({
        display: "block"
      })

    })









  })//window ready
})//deviceready
