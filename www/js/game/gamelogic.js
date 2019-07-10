console.log("--gamelogic--");

class Game {
  constructor(notestoplay, speed, duration, highscore, award) {
    this.notestoplay = notestoplay;
    this.speed = speed;
    this.duration = duration;
    this.highscore = highscore;
    this.award = award;
    this.rndnote = 0;
    this.generatenewNote();
    this.keyhitfunction();

    this.pianoOnClick = $('.pianoOnClick').on('click', function() {

      var mykey = $(this).attr('id');


//spielt note
      $('#game').trigger('keyhit',mykey)


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

        this.rndnote = getRandomInt(this.notestoplay.length);

        var move = new MoveNote(this.speed, this.notestoplay[this.rndnote]);



      }.bind(this))

  }
//spielt note
  keyhitfunction() {


    $('#game').on('keyhit', function(event, keyplayed) {


      console.log(keyplayed);
      // let test = $('.cloned').map(function() {
      //   return this.style.right;
      // });




      if (keyplayed == this.note ) {

        this.hit = true;

        this.clone.find("*").attr('fill', "green")
      }

    }.bind(this))

  }

  generatenewNote(){
    $('#game').on('halftime', function() {

      this.rndnote = getRandomInt(this.notestoplay.length);
      var move = new MoveNote(this.speed, this.notestoplay[this.rndnote]);


    }.bind(this))


  }


}
