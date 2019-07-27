//some code
document.addEventListener('deviceready', function() {

  // console.log(Media);


  $('document').ready(function() {
    console.log('--app.js--');
    var lvliterator = 1;
    var startnextlvl;
    var muteswitch = false;

    if(localStorage.getItem('savefile')== null){
      lvliterator = 1;
      console.log("--------------------------------------nix im speicher--------------------------------------");
    }else{

      var storage = JSON.parse(localStorage.getItem('savefile'));
      lvliterator = storage.oldlvl;
    }




//lvlloader
 $.getJSON("./js/game/lvl/"+lvliterator+".json", function(lvl) {
   

   var start = new Game(lvl.vio.lvl,lvl.vio.difficulty, lvl.vio.noten,lvl.vio.speed,lvl.vio.duration, 0,lvl.vio.highscore,lvl.vio.nextnote, "Anfänger", 150)

 })
 //nextlvlbutton
 $('#nextlvl > *').on("click", function() {
   $('#gamebutton').css({"pointer-events":"auto"})
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









 //mutebutton
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

//popuprechts
    //closes dialog2
    $('#dialog2 div:nth-child(3)').on("click", function() {

      $("#dialog2").css({
        display: "none"
      })

    })

    //show dialog2
    $('#help').on("click", function() {

      $("#dialog2").css({
        display: "block"
      })

    })
    //opens Version
    $('#dialog2version').on("click",function(){
      $("#dialog2").css({
        display: "none"
      })
      $("#dialogversion").css({
        display: "flex"
      })
    })
  //  opens Credits
    $('#dialog2credits').on("click",function(){
      $("#dialog2").css({
        display: "none"
      })
      $("#dialogcredits").css({
        display: "flex"
      })

    })
    //closes dialogversion 2
    $('#dialogversion div:nth-child(2)').on("click",function(){
      $("#dialogversion").css({
        display: "none"
      })
    })
    $('#dialogcredits div:nth-child(2) ').on("click",function(){
      $("#dialogcredits").css({
        display: "none"
      })
    })











  })//window ready
})//deviceready
