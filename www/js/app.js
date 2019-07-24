//some code
document.addEventListener('deviceready', function() {

  // console.log(Media);


  $('document').ready(function() {
    console.log('--app.js--');
    var lvliterator = 1;
    var nextnotecheck = 2;
    var startnextlvl;
    var muteswitch = false;

//lvlloader
 $.getJSON("./js/game/lvl/1.json", function(lvl) {
   console.log(lvl);

   var start = new Game(lvl.vio.lvl,lvl.vio.difficulty, lvl.vio.noten,lvl.vio.speed,lvl.vio.duration, 0,lvl.vio.highscore,lvl.vio.nextnote, "Anfänger", 150)

 })
 //nextlvlbutton
 $('#nextlvl > *').on("click", function() {
   $('#dialog').css({display:"none"})
   console.log("weiter");
   lvliterator++;

   if(lvliterator > 25){
     alert("Spiel durchgespielt")
   }
   $.getJSON("./js/game/lvl/"+lvliterator+".json", function(lvl) {
   startnextlvl = new Game(lvl.vio.lvl, lvl.vio.difficulty,lvl.vio.noten,lvl.vio.speed,lvl.vio.duration, 0,lvl.vio.highscore,lvl.vio.nextnote, "Anfänger", 150)


  })

 })
 //refreshlvl
 $('#refreshlvldialogbutton').on("click",function(){
   $('#gamebutton').css({"pointer-events":"auto"})


   $.getJSON("./js/game/lvl/"+lvliterator+".json", function(lvl) {
     startnextlvl = new Game(lvl.vio.lvl,lvl.vio.difficulty, lvl.vio.noten,lvl.vio.speed,lvl.vio.duration, 0,lvl.vio.highscore,lvl.vio.nextnote, "Anfänger", 150)


     $('#dialog').css({display:"none"});
     $('#successresponse').html("Super!")
     $('#nextlvl').css({display:"flex"})
     $('#refreshlvl >*').css({
       position: "absolute",
       width: "8%",
       height: "8%",
       left: "25%",
       top: "1%"
     })
     $('#refreshlvl').css({"margin-top": "3%"})
   })



 })










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
    $('#mutebutton').on("click", function() {
      console.log(muteswitch);
      if(muteswitch== false){
        $('#muteblank').css({display:"block"})
        $('#audios').attr("class","muteall")
        $(".playing").each(function(){
          $(this).get(0).muted = true;
        })
        muteswitch = true;
      }else{
        $('#muteblank').css({display:"none"})
        $('#audios').removeClass("muteall")
        $(".playing").each(function(){
          $(this).get(0).muted = false;
        })
        muteswitch = false;
      }

    })









  })//window ready
})//deviceready
