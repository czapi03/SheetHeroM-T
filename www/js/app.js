//some code
var nextstorage;
var lvliterator = 1;
var start;
var storage = {
  oldlvl: 0,
  learnprogress: 0
}
var startnextlvl;
var muteswitch = false;
var myclef = "vio";


document.addEventListener('deviceready', function() {
  $('document').ready(function() {
    console.log('--app.js--');

    if (localStorage.getItem('savefile') == null) {

      console.log("--------------------------------------nix im speicher--------------------------------------");
    } else {
      storage = JSON.parse(localStorage.getItem('savefile'));
      lvliterator = storage.oldlvl;
    }


    //lvlloader
    $.getJSON("./js/game/lvl/" + lvliterator + ".json", function(lvl) {

      if (lvl.clef == "bass") {

        $('#bassschlüssel').show();
        myclef = "bass";
        $('#nc4').css({
          position: "absolute",
          height: "4%",
          width: "4.5%",
          top: "25.2%",
          right: "0%"
        })
      } else {

        $('#violinschlüssel').show();
      }
      start = new Game(lvl[myclef].lvl, lvl[myclef].difficulty, lvl[myclef].noten, lvl[myclef].speed, lvl[myclef].duration, 0, lvl[myclef].highscore, lvl[myclef].nextnote, storage.learnprogress)

    })
    //nextlvlbutton
    $('#nextlvl > *').on("click", function() {
      console.log(nextstorage);
      $('#gamebutton').css({
        "pointer-events": "auto"
      })
      $('#dialog').css({
        display: "none"
      })
      console.log("weiter");
      console.log(start.learnprogress);
      lvliterator++;

      $.getJSON("./js/game/lvl/" + lvliterator + ".json", function(lvl) {

        if (lvl.clef == "bass") {
          myclef = "bass";
          $('#bassschlüssel').show();
          myclef = "bass";
          $('#nc4').css({
            position: "absolute",
            height: "4%",
            width: "4.5%",
            top: "25.2%",
            right: "0%"
          })
          $('#violinschlüssel').hide();

        }
        startnextlvl = new Game(lvl[myclef].lvl, lvl[myclef].difficulty, lvl[myclef].noten, lvl[myclef].speed, lvl[myclef].duration, 0, lvl[myclef].highscore, lvl[myclef].nextnote, nextstorage)
      })
    })
    //refreshlvl
    $('#refreshlvldialogbutton').on("click", function() {
      $('#gamebutton').css({
        "pointer-events": "auto"
      })


      $.getJSON("./js/game/lvl/" + lvliterator + ".json", function(lvl) {
        if (lvl.clef == "bass") {
          myclef = "bass";
          $('#bassschlüssel').show();
          myclef = "bass";
          $('#nc4').css({
            position: "absolute",
            height: "4%",
            width: "4.5%",
            top: "25.2%",
            right: "0%"
          })
          $('#violinschlüssel').hide();
        }

        var refreshlvl = new Game(lvl[myclef].lvl, lvl[myclef].difficulty, lvl[myclef].noten, lvl[myclef].speed, lvl[myclef].duration, 0, lvl[myclef].highscore, lvl[myclef].nextnote, nextstorage)


        $('#dialog').css({
          display: "none"
        });
        $('#successresponse').html("Super!")
        $('#nextlvl').css({
          display: "flex"
        })
        $('#refreshlvl >*').css({
          position: "absolute",
          width: "8%",
          height: "8%",
          left: "25%",
          top: "1%"
        })
        $('#refreshlvl').css({
          "margin-top": "3%"
        })
      })
    })

    //mutebutton
    $('#mutebutton').on("click", function() {
      console.log(muteswitch);
      if (muteswitch == false) {
        $('#muteblank').css({
          display: "block"
        })
        $('#audios').attr("class", "muteall")
        $(".playing").each(function() {
          $(this).get(0).muted = true;
        })
        muteswitch = true;
      } else {
        $('#muteblank').css({
          display: "none"
        })
        $('#audios').removeClass("muteall")
        $(".playing").each(function() {
          $(this).get(0).muted = false;
        })
        muteswitch = false;
      }
    })

    //popuprechts
    //closes dialog2
    $('#dialog2 div:nth-child(4)').on("click", function() {

      $("#dialog2").hide();

    })

    //show dialog2
    $('#help').on("click", function() {

      $("#dialog2").show();

    })
    //opens Version
    $('#dialog2version').on("click", function() {
      $("#dialog2").hide();
      $("#dialogversion").css({
        display: "flex"
      })
    })
    //  opens Help
    $('#dialog2credits').on("click", function() {
      $("#dialog2").hide();
      $("#dialogcredits").css({
        display: "flex"
      })
    })

    $('#dialog2 div:nth-child(3)').on("click", function() {
      $("#dialog2").hide();

      $("#dialoghelp").css({
        display: "flex"
      });
    })

    //closes dialoghelp
    $("#dialoghelp > div:nth-child(2)").on("click", function() {
      $("#dialoghelp").hide();
    })

    //closes dialogversion 2
    $('#dialogversion div:nth-child(2)').on("click", function() {
      $("#dialogversion").hide();
    })
    $('#dialogcredits div:nth-child(2) ').on("click", function() {
      $("#dialogcredits").hide();
    })

    //open dialogprofil

    $('.buttonprofil').on("click", function() {
      $('#dialogprofil').css({
        display: "flex"
      });
    })

    //closes dialogprofil

    $("#dialogprofil > div:nth-child(4)").on("click", function() {
      $('#dialogprofil').hide();
    })
  }) //window ready
}) //deviceready
