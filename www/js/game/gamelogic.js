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
    this.mutesound = $('#mutebutton').on('click', function() {

      console.log("mute");



    }.bind(this))
    this.lvlloader();


    this.pianoOnClick = $('.pianoOnClick').on('click', function() {

      var mykey = $(this).attr('id');


      // console.log(this);

      // this.keyhitfunction(speed,mykey)


      //spielt note
      $('#game').trigger('keyhit', mykey)

      // spielt ton
       var media = new Media('assets/wav/' + mykey + '.wav', function() {
        // var media = new Media("/android_asset/www/assets/wav/"+ mykey +".wav", function() {

        // console.log(this);
        media.release();

      }, function(err) {

        alert(JSON.stringify(err));

      });
      media.play();

      // console.log(this.duration);



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

        this.points += (this.highscoretoreach / 25) * (0.25 / speed);
        // this.points +=100;
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

  muteall(mediaarray) {

    for (let i in mediaarray) {
      allmediaobjects[i].setVolume('0.0')
    }

  }

  stop(){
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
  // refreshaftergame(points,duration){
  //   $('.cloned').remove();
  //   clearInterval(this.durationtimer)
  //   clearInterval(this.sendNotes)
  //   $("#gameduration").html(duration)
  //   $("#highscore").html(points)
  //   this.points = points;
  //   console.log("refresh");
  //   this.duration = duration;
  //   $('#gameduration').attr("fill", "#3a3a3a")
  //   $('#highscore').attr("fill", "#3a3a3a")
  // }



}
