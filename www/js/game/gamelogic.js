console.log("--gamelogic--");

class Game {
  constructor(lvl,difficulty, notestoplay, speed, duration, points, highscoretoreach, nextnote,learnprogress) {
    this.lvl = lvl;
    this.difficulty = difficulty;
    this.notestoplay = notestoplay;
    this.speed = $(window).width()*speed/100;
    this.duration = duration;
    this.points = points;
    this.highscoretoreach = highscoretoreach;
    this.nextnote = nextnote;
    this.keyhitfunction(speed);
    this.localstorage = {};
    this.gamerunning = false;
    this.midiinput;
    this.midicheck;
    this.self = this;
    this.move;
    this.midistatus = true;
    this.learnprogress = learnprogress;
    this.rndnote = 0;
    this.sendNotes;
    this.durationtimer;
    //refreshbutton
    this.refreshlvl = $('.refreshbutton').on('click', function() {
      $('#gamebutton').css({"pointer-events":"auto"})

      this.refreshduringgame(points,duration);

    }.bind(this))
    this.lvlloader();
    this.midipiano2();


    this.pianoOnClick = $('.pianoOnClick').on('click', function() {

      var mykey = $(this).attr('id');

      //spielt note
      $('#game').trigger('keyhit', mykey)

      if($('#audios').hasClass("muteall")){
        console.log("muted");
        var media = $("<audio>").attr({class:"playing"}).append('<source src="./assets/wav/' + mykey + '.wav" type="audio/ogg" />').appendTo("#audios");
      }else{

        var media = $("<audio>").attr({"autoplay":"true",class:"playing"}).append('<source src="./assets/wav/' + mykey + '.wav" type="audio/ogg" />').appendTo("#audios");
      }


      setTimeout(function () {
        media.remove()
      }, 1500);
    })


    //startet gamelogic
    this.startButton = $('#gamebutton')
      .on('click', function() {
        $('.cloned').find("*").attr("fill", "#000000")
        console.log("start");
        this.gamerunning = true;
        $('#gamebutton').css({"pointer-events":"none"})


        this.rndnote = getRandomInt(this.notestoplay.length);

        this.move = new MoveNote(this.speed, this.notestoplay[this.rndnote]);
        this.generatenewNote(speed);
        this.timecountdown();



      }.bind(this))

  }
  //spielt note
  keyhitfunction(speed) {


    $('#game').on('keyhit', function(event, keyplayed) {

      keyplayed = "n" + keyplayed;

    // console.log("keyhit");

      // var highestNote = $('.cloned.hitable').toArray().find(function(note) {
      //   return parseInt($(note).get(0).style.right) < $(window).width()*0.66
      // })
      var highestNote = $('.cloned.hitable').toArray().find(function(note) {

        return parseInt($(note).position().left) > $(window).width()*0.33
      })


      if (keyplayed == $(highestNote).attr("id")) {
        keyplayed = keyplayed.slice(1, 3)

        $('#' + keyplayed).addClass("colorhitrightkey");
        setTimeout(function() {
          $('#' + keyplayed).removeClass('colorhitrightkey')

        }, 300);

        $(highestNote).removeClass('hitable')
        $(highestNote).find("*").attr("fill", "green")
        $(highestNote).addClass('hit')




          this.points += (this.highscoretoreach / 25) * (0.25 / speed);


        // this.points +=100;

        if (this.learnprogress < 400) {
          this.learnprogress += 0.25

          $('#progressbar').css({
            width: this.learnprogress + "%"
          })


          if(this.learnprogress > 100 && this.learnprogress <=200){
            $('#learnprogressname').html('Fortgeschrittener')
            $('#progressbar').css({
              width: this.learnprogress-100 + "%"
            })

          }
          if(this.learnprogress > 200 && this.learnprogress <=300){
            $('#learnprogressname').html('Profi')
            $('#progressbar').css({
              width: this.learnprogress-200 + "%"
            })

          }
          if(this.learnprogress > 300 && this.learnprogress <=400){
            $('#learnprogressname').html('Meister')
            $('#progressbar').css({
              width: this.learnprogress-300 + "%"
            })

          }






          }



        // switch (this.learnprogress) {
        //   case 100: $('#learnprogressname').html('Profi')
        //
        //     break;
        //   default:
        //
        // }




        $('.eyes').attr("fill","#56ce46")
        setTimeout(function() {
          $('.eyes').attr("fill","#000000")



        }, 300);




      } else {
        console.log(this.gamerunning);
        if(this.gamerunning == true){


          this.points -= this.highscoretoreach / 25*(0.25 / speed);
          this.learnprogress -= 0.25;
        }

        keyplayed = keyplayed.slice(1, 3)

        $('#' + keyplayed).addClass("colorhitwrongkey");
        $('.eyes').attr("fill","#F80E0E")

        setTimeout(function() {
          $('#' + keyplayed).removeClass('colorhitwrongkey')
          $('.eyes').attr("fill","#000000")


        }, 300);


        if (this.learnprogress <=0) {
          this.learnprogress = 0;

        }
        $('#progressbar').css({
          width: this.learnprogress + "%"
        })
        if(this.learnprogress > 100 && this.learnprogress <=200){
          $('#learnprogressname').html('Fortgeschrittener')
          $('#progressbar').css({
            width: this.learnprogress-100 + "%"
          })

        }
        if(this.learnprogress > 200 && this.learnprogress <=300){
          $('#learnprogressname').html('Profi')
          $('#progressbar').css({
            width: this.learnprogress-200 + "%"
          })

        }
        if(this.learnprogress > 300 && this.learnprogress <=400){
          $('#learnprogressname').html('Meister')
          $('#progressbar').css({
            width: this.learnprogress-300 + "%"
          })

        }







      }
      if (this.points < 0) {
        $('#highscore').attr("fill", "#F80E0E");
      } else {
        $('#highscore').attr("fill", "black");
      }
      if (this.points > 0) {
        $('#highscore').attr("fill", "#56ce46");
      }

      $('#highscore').html(this.points)





    }.bind(this))
  }






  generatenewNote(speed) {
    var _this = this;

    _this.sendNotes = setInterval(function() {

      _this.rndnote = getRandomInt(_this.notestoplay.length);
      _this.move = new MoveNote(_this.speed, _this.notestoplay[_this.rndnote]);
//
    }, 2350 / (speed / 0.25));
  // }, 2350 );

  }
  timecountdown() {
    var _this = this;

    _this.durationtimer = setInterval(function() {
      _this.duration--;

      $('#gameduration').html(_this.duration)
      if (_this.duration <= 5) {
        $('#gameduration').attr("fill", "red")
      }
      if (_this.duration == 0) {
        clearInterval(_this.durationtimer)
        clearInterval(_this.sendNotes)


        // _this.stop();
        $('.cloned').remove();
        $('#gameduration').attr("fill", "#3a3a3a")
        $('#highscore').attr("fill", "#3a3a3a")
        $('#afterpoints').html("Punkte: "+_this.points).css({"color":"black"})
        $('#notelistingnames').html("Es wird schneller!").css({"color":"black"})
        $('#dialoglinks > h2').html("Level "+_this.lvl+" geschafft!")

        $('#margintop').html("Bereite dich auf Level "+(_this.lvl+1)+"vor!")


        if((_this.lvl %2)==0 ){

          $('#notelistingnames').html("Es kommt dazu: "+_this.nextnote).css({"color":"black"})
        }


        if (_this.points < (_this.highscoretoreach * _this.difficulty)) {
          _this.lvl-=1;
          $('#successresponse').html("Schade")
          $('#dialoglinks > h2').html("Level "+_this.lvl+" leider nicht geschafft!")
          $('#dialogrechts p').html("");
          console.log("duration negativ", _this);
          $('#refreshlvl >*').css({
              position: "absolute",
              width: "45%",
              height: "28%",
              left: "27%",
              top: "33%"
          })
          $('#refreshlvl').css({"margin-top": "71%"})
          $('#nextlvl').css({display:"none"})
        }
        _this.stop();

        $('#dialog').css({
          display: "block"
        })
      }
      if (_this.duration < 10) {
        $('#gameduration').html('0' + _this.duration)
      }
    }, 1000);
  }

  lvlloader() {

    $('#highscoretoreach').html("Erreiche " + this.highscoretoreach * this.difficulty + " Punkte für Level " + (this.lvl + 1))
    $('#gamelvl').html(this.lvl)
    $('#progressbar').css({
      width: this.learnprogress + '%'
    })
    $('#highscore').html(this.points)
    $('#gameduration').html(this.duration)

    if(this.learnprogress >= 100 && this.learnprogress <=200){
      $('#learnprogressname').html('Fortgeschrittener')
      $('#progressbar').css({
        width: this.learnprogress-100 + "%"
      })

    }
    if(this.learnprogress >= 200 && this.learnprogress <=300){
      $('#learnprogressname').html('Profi')
      $('#progressbar').css({
        width: this.learnprogress-200 + "%"
      })

    }
    if(this.learnprogress >= 300 && this.learnprogress <=400){
      $('#learnprogressname').html('Meister')
      $('#progressbar').css({
        width: this.learnprogress-300 + "%"
      })

    }








  }



  stop(){


    this.localstorage.oldlvl = this.lvl+1;
    this.localstorage.learnprogress = this.learnprogress;

    localStorage.setItem('savefile',JSON.stringify(this.localstorage))

    clearInterval(this.midicheck)

    this.gamerunning = false;
    nextstorage = this.learnprogress;
    console.log('--'+nextstorage+'--');
    $('#game').off("keyhit")
    $('.refreshbutton').off("click")
     $('.pianoOnClick').off("click")
     $('#gamebutton').off("click")
     console.log("stoped lvl"+ this.lvl);
     window.plugins.insomnia.allowSleepAgain();

     if(WebMidi._inputs.length > 0){
       console.log("disable-midiinput");
       this.midiinput.removeListener("noteon");

     }
     WebMidi.disable();

  }
  refreshduringgame(points,duration){
    this.gamerunning = false;
    $('.cloned').remove();
    clearInterval(this.durationtimer)
    window.cancelAnimationFrame(this.move.Req)
    clearInterval(this.sendNotes)
    $("#gameduration").html(duration)
    $("#highscore").html(points)
    this.points = points;
    // console.log(duration);
    this.duration = duration;
    $('#gameduration').attr("fill", "#3a3a3a")
    $('#highscore').attr("fill", "#3a3a3a")
  }


  midipiano2(){
    var _this = this;

    var mykey;
    WebMidi.enable(function () {

      //Midi watcher
      _this.midicheck = setInterval(function () {
        window.plugins.insomnia.keepAwake();
        if(WebMidi._inputs.length > 0){

          $('#midikreis').attr("fill","#56ce46");
          $('#midiindicator div:nth-child(2)').html('-keyboard on')
          if (_this.midistatus == false){
            $('#midikreis').attr("fill","#F80E0E");
            $('#midiindicator div:nth-child(2)').html('keyboard off,starte App neu')

          }

        }else{
          $('#midikreis').attr("fill","#F80E0E");
          $('#midiindicator div:nth-child(2)').html('-keyboard off')
          _this.midistatus = false;
        }

      }, 1000);


      var keyboardid = WebMidi._inputs[0].id
      // console.logi);
      _this.midiinput = WebMidi.getInputById(keyboardid);
      -this.midiinput.addListener('noteon', 'all',
        function (e) {
            console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
            switch (e.note.name + e.note.octave) {
                  case "C4": mykey = "c4"

                    break;
                  case "C#4": mykey = "csharpdflat4"

                    break;
                  case "D4": mykey = "d4"

                    break;
                  case "D#4": mykey = "dsharpeflat4"

                    break;
                  case "E4": mykey = "e4"

                    break;
                  case "F4": mykey = "f4"

                    break;
                  case "F#4": mykey = "fsharpgflat4"

                    break;
                  case "G4": mykey = "g4"

                    break;
                  case "G#4": mykey = "gsharpaflat4"

                    break;
                  case "A4": mykey = "a4"
                    break;
                  case "A#4": mykey = "asharpbflat4"
                  break;
                  case "B4": mykey = "h4"
                  break;
                  case "C5": mykey = "c5"

                    break;
                  case "C#5": mykey = "csharpdflat5"

                    break;
                  case "D5": mykey = "d5"

                    break;
                  case "D#5": mykey = "dsharpeflat5"

                    break;
                  case "E5": mykey = "e5"

                    break;
                  case "F5": mykey = "f5"

                    break;
                  case "F#5": mykey = "fsharpgflat5"

                    break;
                  case "G5": mykey = "g5"

                    break;
                  case "G#5": mykey = "gsharpaflat5"

                    break;
                  case "A5": mykey = "a5"
                    break;
                  case "A#5": mykey = "asharpbflat5"
                  break;
                  case "B5": mykey = "h5"
                  break;
                  case "C6": mykey = "c6"
                  break;

                  default:
                  console.log("not se right key");
                  mykey = 0;

                  break;
                }//switch
                    if(typeof mykey === "string"){


                      if($('#audios').hasClass("muteall")){
                        console.log("muted");
                        var media = $("<audio>").attr({class:"playing"}).append('<source src="./assets/wav/' + mykey + '.wav" type="audio/ogg" />').appendTo("#audios");
                      }else{

                        var media = $("<audio>").attr({"autoplay":"true",class:"playing"}).append('<source src="./assets/wav/' + mykey + '.wav" type="audio/ogg" />').appendTo("#audios");
                      }
                      // console.log(media);

                      setTimeout(function () {
                        media.remove()
                      }, 1500);

                      $('#game').trigger('keyhit', mykey)
                    }




        }
    );






  }.bind(this))



  }




}
