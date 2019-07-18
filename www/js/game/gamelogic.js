console.log("--gamelogic--");

class Game {
  constructor(lvl, notestoplay, speed, duration, points, highscoretoreach, awardname, awardpoints, award) {
    this.lvl = lvl;
    this.notestoplay = notestoplay;
    this.speed = speed;
    this.duration = duration;
    this.points = points;
    this.highscoretoreach = highscoretoreach;
    this.awardname = awardname;
    this.awardpoints = awardpoints;
    this.media;
    this.mediaarray;
    this.self = this;
    this.move;
    this.progressbarupdate = 0;
    this.award = award;
    this.rndnote = 0;
    this.sendNotes;
    this.durationtimer;
    //refreshbutton
    this.refreshlvl = $('.refreshbutton').on('click', function() {
      $("#gameduration").html(duration)
      $("#highscore").html(points)
      this.points = points;
      clearInterval(this.sendNotes)
      window.cancelAnimationFrame(this.move.Req)
      $('.cloned').remove();
      clearInterval(this.durationtimer)
      console.log(duration);
      this.duration = duration;

    }.bind(this))
    //mutebutton
    this.mutesound = $('#mutebutton').on('click', function() {

      console.log("mute");



    }.bind(this))
    this.lvlloader();
    this.keyhitfunction();

    this.pianoOnClick = $('.pianoOnClick').on('click', function() {

      var mykey = $(this).attr('id');
      // console.log(this);



      //spielt note
      $('#game').trigger('keyhit', mykey)

      //spielt ton
       // var media = new Media('assets/wav/' + mykey + '.wav', function() {
        var media = new Media("/android_asset/www/assets/wav/"+ mykey +".wav", function() {

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
        console.log(this);

        this.rndnote = getRandomInt(this.notestoplay.length);

        this.move = new MoveNote(this.speed, this.notestoplay[this.rndnote]);
        this.generatenewNote();
        this.timecountdown();



      }.bind(this))

  }
  //spielt note
  keyhitfunction() {


    $('#game').on('keyhit', function(event, keyplayed) {

      keyplayed = "n" + keyplayed;


      var highestNote = $('.cloned.hitable').toArray().find(function(note) {
        return parseInt($(note).get(0).style.right) < 66
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

        this.points += (this.highscoretoreach / 25) * (0.25 / this.speed);
        this.progressbarupdate += 5;

        $('#progressbar').css({
          width: this.progressbarupdate + "%"
        })
        if (this.progressbarupdate >= 100) {
          this.progressbarupdate = 0;

        }




      } else {
        this.points -= this.highscoretoreach / 25;
        keyplayed = keyplayed.slice(1, 3)

        $('#' + keyplayed).addClass("colorhitwrongkey");


        setTimeout(function() {
          $('#' + keyplayed).removeClass('colorhitwrongkey')



        }, 300);
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





  generatenewNote() {
    var _this = this;

    _this.sendNotes = setInterval(function() {

      _this.rndnote = getRandomInt(_this.notestoplay.length);
      _this.move = new MoveNote(_this.speed, _this.notestoplay[_this.rndnote]);

    }, 2350 / (_this.speed / 0.25));

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
        _this.stop();
        $('.cloned').remove();

        if (_this.points < (_this.highscoretoreach * 0.8)) {
          $('#successresponse').html("Schade")
        }

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
    $('#highscoretoreach').html("Erreiche " + this.highscoretoreach * 0.8 + " Punkte für Level " + (this.lvl + 1))
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
    $('.refreshbutton').off("click")
     $('#mutebutton').off("click")
     $('.pianoOnClick').off("click")
     $('#gamebutton').off("click")
     $('#game').off("click")
     console.log("stoped lvl"+ this.lvl);

  }



}
