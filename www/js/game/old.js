
    //old lvl generator for onejson file
    // $.getJSON("js/game/levelcollection.json", function(levelcol) {
    //   console.log(levelcol);
    //
    //     var currentlvl = levelcol[0].lvl;
    //     var currentnoten = levelcol[0].noten;
    //     var currentspeed = levelcol[0].speed;
    //     var currentduration = levelcol[0].duration;
    //     var currenthighscore = levelcol[0].highscore;
    //
    //     var nextnote = levelcol[lvliterator+nextnotecheck].noten[levelcol[lvliterator+nextnotecheck].noten.length-1];
    //     // console.log(nextnote);
    //
    //
    //
    //
    //     var start = new Game(currentlvl, currentnoten, currentspeed, currentduration, 0,currenthighscore,nextnote, "Anfänger", 150);
    //
    //     //nextlvlbutton
    //     $('#nextlvl > *').on("click", function() {
    //       $('#dialog').css({display:"none"})
    //       console.log("weiter");
    //       lvliterator++;
    //       if(lvliterator > 22){
    //         nextnotecheck = 0;
    //       }
    //       if(lvliterator > 24){
    //         alert("Spiel durchgespielt")
    //       }
    //
    //       startnextlvl = new Game(levelcol[lvliterator].lvl, levelcol[lvliterator].noten,levelcol[lvliterator].speed,levelcol[lvliterator].duration, 0,levelcol[lvliterator].highscore,levelcol[lvliterator+nextnotecheck].noten[levelcol[lvliterator+nextnotecheck].noten.length-1], "Anfänger", 150)
    //
    //
    //     })
    //     //refreshlvl
    //
    //     $('#refreshlvldialogbutton').one("click",function(){
    //       $('#dialog').css({display:"none"});
    //       var refreshlvl = new Game(levelcol[lvliterator].lvl, levelcol[lvliterator].noten,levelcol[lvliterator].speed,levelcol[lvliterator].duration, 0,levelcol[lvliterator].highscore,levelcol[lvliterator+nextnotecheck].noten[levelcol[lvliterator+nextnotecheck].noten.length-1], "Anfänger", 150)
    //       $('#successresponse').html("Super!")
    //       $('#nextlvl').css({display:"flex"})
    //       $('#refreshlvl >*').css({
    //         position: "absolute",
    //         width: "8%",
    //         height: "8%",
    //         left: "25%",
    //         top: "1%"
    //       })
    //       $('#refreshlvl').css({"margin-top": "3%"})
    //
    //
    //
    //     })
    //
    //
    //
    //
    // });//lvlload

    //OLD
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
    //         .then(onMIDISuccess, onMIDIFailure)
    //         .then(function(sd){
    //           console.log(sd);
    //         })
    //
    //
    //         function onMIDIFailure() {
    //           console.log('Could not access your MIDI devices.');
    //         }
    //
    //         function onMIDISuccess(midiAccess) {
    //           for (var input of midiAccess.inputs.values()){
    //             input.onmidimessage = getMIDIMessage;
    //             console.log(midiAccess);
    //           }
    //         }
    //
    //         function getMIDIMessage(midiMessage) {
    //
    //           console.log(midiMessage);
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
    //           return mykey;
    //
    //         }
    //
    //
    //
    //
    //
    // }
