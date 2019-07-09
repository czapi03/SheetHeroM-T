console.log("--gamelogic--");

class Game {
  constructor(notestoplay, speed, duration, highscore, award) {
    this.notestoplay = notestoplay;
    this.speed = speed;
    this.duration = duration;
    this.highscore = highscore;
    this.award = award;
    this.rndnote = 0;
    this.pianoOnClick = $('.pianoOnClick').on('click', function() {

      var mykey = $(this).attr('id');

      $('#game').trigger('keyhit',mykey)
      

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


    this.startButton = $('#gamebutton')
      .on('click', function() {

        this.rndnote = getRandomInt(this.notestoplay.length);

        var move = new MoveNote(this.speed, this.notestoplay[this.rndnote]);

        $('#game').on('halftime', function() {

          this.rndnote = getRandomInt(this.notestoplay.length);
          var move = new MoveNote(this.speed, this.notestoplay[this.rndnote]);


        }.bind(this))

      }.bind(this))









  }




}
