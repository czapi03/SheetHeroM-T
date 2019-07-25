console.log("--gamelogic--");

class Game {
  constructor(lvl,difficulty, notestoplay, speed, duration, points, highscoretoreach, nextnote,awardname, awardpoints) {
    this.lvl = lvl;
    this.difficulty = difficulty;
    this.notestoplay = notestoplay;
    this.speed = $(window).width()*speed/100;
    this.duration = duration;
    this.points = points;
    this.highscoretoreach = highscoretoreach;
    this.awardname = awardname;
    this.awardpoints = awardpoints;
    this.nextnote = nextnote;
    this.keyhitfunction(speed);
    this.media;
    this.mediaarray;
    this.self = this;
    this.move;
    this.progressbarupdate = 0;
    // this.award = award;
    this.rndnote = 0;
    this.sendNotes;
    this.durationtimer;
    this.midiinput;
    //refreshbutton
    this.refreshlvl = $('.refreshbutton').on('click', function() {
      $('#gamebutton').css({"pointer-events":"auto"})

      this.refreshduringgame(points,duration);

    }.bind(this))
    // refreshbutton2
    // this.refreshbuttondialog = $('#refreshlvldialogbutton').on("click",function(){
    //   $('#dialog').css({display:"none"});
    //   this.refreshaftergame(points,duration);
    //   // $('#refreshlvldialogbutton').off("click")
    //
    //
    // }.bind(this))
    //mutebutton

    this.lvlloader();
    this.midipiano2();


    this.pianoOnClick = $('.pianoOnClick').on('click', function() {

      var mykey = $(this).attr('id');

      //spielt note
      $('#game').trigger('keyhit', mykey)

      // // spielt ton
      //  var media = new Media('assets/wav/' + mykey + '.wav', function() {
      //   // var media = new Media("/android_asset/www/assets/wav/"+ mykey +".wav", function() {
      //
      //
      //   media.release();
      //
      // }, function(err) {
      //
      //   alert(JSON.stringify(err));
      //
      // });
      // media.play();
      if($('#audios').hasClass("muteall")){
        console.log("muted");
        var media = $("<audio>").attr({class:"playing"}).append('<source src="./assets/wav/' + mykey + '.wav" type="audio/ogg" />').appendTo("#audios");
      }else{

        var media = $("<audio>").attr({"autoplay":"true",class:"playing"}).append('<source src="./assets/wav/' + mykey + '.wav" type="audio/ogg" />').appendTo("#audios");
      }
      console.log(media);

      setTimeout(function () {
        media.remove()
      }, 1500);
    })


    //startet gamelogic
    this.startButton = $('#gamebutton')
      .on('click', function() {
        $('.cloned').find("*").attr("fill", "#000000")
        console.log("start");

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

        // this.points += (this.highscoretoreach / 25) * (0.25 / speed);
        this.points +=100;
        this.progressbarupdate += 5;

        $('#progressbar').css({
          width: this.progressbarupdate + "%"
        })
        if (this.progressbarupdate >= 100) {
          this.progressbarupdate = 100;

        }
        $('.eyes').attr("fill","#56ce46")
        setTimeout(function() {
          $('.eyes').attr("fill","#000000")



        }, 300);




      } else {
        this.points -= this.highscoretoreach / 25*(0.25 / speed);
        keyplayed = keyplayed.slice(1, 3)

        $('#' + keyplayed).addClass("colorhitwrongkey");
        $('.eyes').attr("fill","#F80E0E")

        setTimeout(function() {
          $('#' + keyplayed).removeClass('colorhitwrongkey')
          $('.eyes').attr("fill","#000000")


        }, 300);
        this.progressbarupdate -= 5;
        if (this.progressbarupdate <=0) {
          this.progressbarupdate = 0;

        }

        $('#progressbar').css({
          width: this.progressbarupdate + "%"
        })

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
  progressbarfiller(progress) {

    $('#progressbar').css({
      width: progress + '%'
    })


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
      console.log(_this.duration);
      $('#gameduration').html(_this.duration)
      if (_this.duration <= 5) {
        $('#gameduration').attr("fill", "red")
      }
      if (_this.duration == 0) {
        clearInterval(_this.durationtimer)
        clearInterval(_this.sendNotes)
        console.log(_this);
        _this.stop();
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
        console.log(_this.points);

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

    $('#highscore').html(this.points)
    $('#gameduration').html(this.duration)
    $('#awardname').html(this.awardname)
    $('#awardpoints').html(this.awardpoints)

  }



  stop(){
    this.input.removeListener("noteon");
    WebMidi.disable();
    $('#game').off("keyhit")
    $('.refreshbutton').off("click")
     $('#mutebutton').off("click")
     $('.pianoOnClick').off("click")
     $('#gamebutton').off("click")
     console.log("stoped lvl"+ this.lvl);

  }
  refreshduringgame(points,duration){
    $('.cloned').remove();
    clearInterval(this.durationtimer)
    window.cancelAnimationFrame(this.move.Req)
    clearInterval(this.sendNotes)
    $("#gameduration").html(duration)
    $("#highscore").html(points)
    this.points = points;
    console.log(duration);
    this.duration = duration;
    $('#gameduration').attr("fill", "#3a3a3a")
    $('#highscore').attr("fill", "#3a3a3a")
  }


  // midipiano(){
  //
  //       var mykey= 0;
  //
  //         if (navigator.requestMIDIAccess) {
  //           console.log('This browser supports WebMIDI!');
  //         } else {
  //           console.log('WebMIDI is not supported in this browser.');
  //         }
  //
  //         navigator.requestMIDIAccess()
  //         .then(onMIDISuccess, onMIDIFailure);
  //
  //
  //
  //         function onMIDIFailure() {
  //           console.log('Could not access your MIDI devices.');
  //         }
  //
  //         function onMIDISuccess(midiAccess) {
  //
  //           var inputs = midiAccess.inputs;
  //           console.log(inputs);
  //           for (var input of midiAccess.inputs.values()){
  //             input.onmidimessage = getMIDIMessage;
  //             console.log(midiAccess);
  //           }
  //         }
  //
  //         function getMIDIMessage(midiMessage) {
  //
  //           // console.log(midiMessage);
  //           // console.log(testdsd);
  //           switch (midiMessage.data[1]) {
  //             case 60: mykey = "c4"
  //
  //               break;
  //             case 61: mykey = "csharpdflat4"
  //
  //               break;
  //             case 62: mykey = "d4"
  //
  //               break;
  //             case 63: mykey = "dsharpeflat4"
  //
  //               break;
  //             case 64: mykey = "e4"
  //
  //               break;
  //             case 65: mykey = "f4"
  //
  //               break;
  //             case 66: mykey = "fsharpgflat4"
  //
  //               break;
  //             case 67: mykey = "g4"
  //
  //               break;
  //             case 68: mykey = "gsharpaflat4"
  //
  //               break;
  //             case 69: mykey = "a4"
  //
  //               break;
  //             case 70: mykey = "asharpbflat4"
  //
  //               break;
  //             case 71: mykey = "h4"
  //
  //               break;
  //             case 72: mykey = "c5"
  //
  //               break;
  //             case 73: mykey = "csharpdflat5"
  //
  //               break;
  //             case 74: mykey = "d5"
  //
  //               break;
  //             case 75: mykey = "dsharpeflat5"
  //
  //               break;
  //             case 76: mykey = "e5"
  //
  //               break;
  //             case 77: mykey = "f5"
  //
  //               break;
  //             case 78: mykey = "fsharpgflat5"
  //
  //               break;
  //             case 79: mykey = "g5"
  //
  //               break;
  //             case 80: mykey = "gsharpaflat5"
  //
  //               break;
  //             case 81: mykey = "a5"
  //
  //               break;
  //             case 82: mykey = "asharpbflat5"
  //
  //               break;
  //             case 83: mykey = "h5"
  //
  //               break;
  //             case 84: mykey = "c6"
  //
  //               break;
  //
  //
  //             default: console.log("nicht die taste");
  //
  //               break;
  //
  //           }
  //
  //           if(midiMessage.data[0]==144){
  //             console.log("spiel note");
  //           if($('#audios').hasClass("muteall")){
  //             console.log("muted");
  //             var media = $("<audio>").attr({class:"playing"}).append('<source src="./assets/wav/' + mykey + '.wav" type="audio/ogg" />').appendTo("#audios");
  //           }else{
  //
  //             var media = $("<audio>").attr({"autoplay":"true",class:"playing"}).append('<source src="./assets/wav/' + mykey + '.wav" type="audio/ogg" />').appendTo("#audios");
  //           }
  //           // console.log(media);
  //
  //           setTimeout(function () {
  //             media.remove()
  //           }, 1500);
  //
  //           $('#game').trigger('keyhit', mykey)
  //         }
  //
  //
  //         }
  //
  //
  //
  //
  //
  // }

midipiano2(){
  console.log(WebMidi);
  var mykey;
console.log("------midipiano2----");

  WebMidi.enable(function (err) {
    // console.log("enable neu");
    // if (err) {
    //   console.log("WebMidi could not be enabled.", err);
    // } else {
    //   console.log("WebMidi enabled!");
    // }
console.log("------midipiano2eanble----");
    this.input = WebMidi.getInputByName("microKEY-37");

    this.input.addListener('noteon', 'all',
       function (e) {
           // console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
           // console.log(e.note.name + e.note.octave);
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


                console.log(mykey);
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
                  }, 1000);

                  $('#game').trigger('keyhit', mykey)
                }
       }//callbacklistener
   );//midilistener





 }.bind(this)); //webmidi enable



}


}
