//some code
document.addEventListener('deviceready', function() {

  // console.log(Media);


  $('document').ready(function() {
    console.log('--app.js--');
    var lvliterator = 0;
    var nextnotecheck = 2;
    var startnextlvl;


    $.getJSON("js/game/levelcollection.json", function(levelcol) {


        var currentlvl = levelcol[0].lvl;
        var currentnoten = levelcol[0].noten;
        var currentspeed = levelcol[0].speed;
        var currentduration = levelcol[0].duration;
        var currenthighscore = levelcol[0].highscore;

        var nextnote = levelcol[lvliterator+nextnotecheck].noten[levelcol[lvliterator+nextnotecheck].noten.length-1];
        // console.log(nextnote);




        var start = new Game(currentlvl, currentnoten, currentspeed, currentduration, 0,currenthighscore,nextnote, "Anfänger", 150);

        //nextlvlbutton
        $('#nextlvl > *').on("click", function() {
          $('#dialog').css({display:"none"})
          console.log("weiter");
          lvliterator++;
          if(lvliterator > 22){
            nextnotecheck = 0;
          }
          if(lvliterator > 24){
            alert("Spiel durchgespielt")
          }

          startnextlvl = new Game(levelcol[lvliterator].lvl, levelcol[lvliterator].noten,levelcol[lvliterator].speed,levelcol[lvliterator].duration, 0,levelcol[lvliterator].highscore,levelcol[lvliterator+nextnotecheck].noten[levelcol[lvliterator+nextnotecheck].noten.length-1], "Anfänger", 150)


        })
        //refreshlvl

        $('#refreshlvldialogbutton').on("click",function(){
          $('#dialog').css({display:"none"});
          var refreshlvl = new Game(levelcol[lvliterator].lvl, levelcol[lvliterator].noten,levelcol[lvliterator].speed,levelcol[lvliterator].duration, 0,levelcol[lvliterator].highscore,levelcol[lvliterator+nextnotecheck].noten[levelcol[lvliterator+nextnotecheck].noten.length-1], "Anfänger", 150)


        })




    });









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
