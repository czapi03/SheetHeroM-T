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
    this.award = award;
    this.rndnote = 0;
    this.lvlloader();
    this.generatenewNote();
    this.keyhitfunction();

    this.pianoOnClick = $('.pianoOnClick').on('click', function() {

      var mykey = $(this).attr('id');


      //spielt note
      $('#game').trigger('keyhit', mykey)


      //spielt ton
      // var media = new Media('assets/wav/' + mykey + '.wav', function() {
      // var media = new Media("/android_asset/www/assets/wav/"+ mykey +".wav", function() {
      //
      //     media.release();
      //
      // }, function(err) {
      //
      //   alert(JSON.stringify(err));
      //
      // });
      // media.play();




    })

    //startet gamelogic
    this.startButton = $('#gamebutton')
      .on('click', function() {
        $('.cloned').find("*").attr("fill", "#000000")

        this.rndnote = getRandomInt(this.notestoplay.length);

        var move = new MoveNote(this.speed, this.notestoplay[this.rndnote]);



      }.bind(this))

  }
  //spielt note
  keyhitfunction() {


    $('#game').on('keyhit', function(event, keyplayed) {

      keyplayed = "n" + keyplayed;


      var highestNote = $('.cloned.hitable').toArray().find(function(note) {
        return parseInt($(note).get(0).style.right) < 66
      })


      $(highestNote).removeClass('hitable')
      $(highestNote).find("*").attr("fill", "green")
      $(highestNote).addClass('hit')






    })
  }

  generatenewNote() {
    $('#game').on('halftime', function() {

      this.rndnote = getRandomInt(this.notestoplay.length);
      var move = new MoveNote(this.speed, this.notestoplay[this.rndnote]);


    }.bind(this))


  }

  lvlloader() {
    $('#gamelvl').html(this.lvl)
    $('#highscore').html(this.highscore)
    $('#gameduration').html(this.duration)
    $('#awardname').html(this.awardname)
    $('#awardpoints').html(this.awardpoints)

  }


}
