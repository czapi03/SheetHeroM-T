console.log("--gamelogic--");

class Game {
  constructor(lvl, notestoplay, speed, duration, highscore, awardname, awardpoints, award) {
    this.lvl = lvl;
    this.notestoplay = notestoplay;
    this.speed = speed;
    this.duration = duration;
    this.highscore = highscore;
    this.awardname = awardname;
    this.awardpoints = awardpoints;
    this.progressbarupdate = 0;
    this.award = award;
    this.rndnote = 0;
    this.sendNotes;
    this.lvlloader();

    this.keyhitfunction();

    this.pianoOnClick = $('.pianoOnClick').on('click', function() {

      var mykey = $(this).attr('id');


      //spielt note
      $('#game').trigger('keyhit', mykey)


      //spielt ton
      var media = new Media('assets/wav/' + mykey + '.wav', function() {
      // var media = new Media("/android_asset/www/assets/wav/"+ mykey +".wav", function() {

          media.release();

      }, function(err) {

        alert(JSON.stringify(err));

      });
      media.play();




    })


    //startet gamelogic
    this.startButton = $('#gamebutton')
      .on('click', function() {
        $('.cloned').find("*").attr("fill", "#000000")

        this.rndnote = getRandomInt(this.notestoplay.length);

        var move = new MoveNote(this.speed, this.notestoplay[this.rndnote]);
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

        $(highestNote).removeClass('hitable')
        $(highestNote).find("*").attr("fill", "green")
        $(highestNote).addClass('hit')

        this.highscore += 25;
        this.progressbarupdate+=5;

        $('#progressbar').css({width: this.progressbarupdate + "%"})



      } else {
        this.highscore -= 25;
      }

      $('#highscore').html(this.highscore)





    }.bind(this))
  }
  progressbarfiller(progress){

    $('#progressbar').css({width: progress+'%'})


  }





  generatenewNote() {
    var _this = this;

    _this.sendNotes = setInterval(function() {

      _this.rndnote = getRandomInt(_this.notestoplay.length);
      var move = new MoveNote(_this.speed, _this.notestoplay[_this.rndnote]);

    }, 2350);

  }
  timecountdown(){
    var _this = this;

    var timer = setInterval(function () {
      _this.duration--;
      console.log(_this.duration);
      $('#gameduration').html(_this.duration)
      if(_this.duration <= 5){
        $('#gameduration').attr("fill","red")
      }
      if(_this.duration == 0){
        clearInterval(timer)
        clearInterval(_this.sendNotes)
        $('#dialog').css({
          display: "block"
        })
      }
      if(_this.duration <10){
        $('#gameduration').html('0'+_this.duration)
      }
    }, 1000);
  }

  lvlloader() {
    $('#gamelvl').html(this.lvl)
    $('#highscore').html(this.highscore)
    $('#gameduration').html(this.duration)
    $('#awardname').html(this.awardname)
    $('#awardpoints').html(this.awardpoints)

  }


}
