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

      // $('.cloned').each(function(i,note){
      //   if($(note).hasClass("hitable")){
      //     console.log("yes");
      //     note.style.backgroundColor ="green"
      //   }
      // })

      var highestNote = null;

      $('.cloned').each(function(i, note /* == $('.cloned')[i] */ ) {
        console.log(note);
        // console.log(parseInt($(note).get(0).style.right))


        if (!highestNote || ($(note).hasClass("hitable") && parseInt($(note).get(0).style.right) > parseInt($(highestNote).get(0).style.right))) {
          highestNote = note
        }



      })

      // if (keyplayed == $(highestNote).attr("id") && $(highestNote).hasClass("hitable") ) {

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
