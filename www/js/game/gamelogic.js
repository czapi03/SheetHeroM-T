console.log("--gamelogic--");

class Game {
  constructor(notestoplay, speed, duration, highscore, award) {
    this.notestoplay = notestoplay;
    this.speed = speed;
    this.duration = duration;
    this.highscore = highscore;
    this.award = award;
    this.rndnote = 0;


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
