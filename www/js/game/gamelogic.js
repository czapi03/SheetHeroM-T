console.log("--gamelogic--");

class Game {
  constructor(notestoplay, pace, duration, finishline) {
    // this.pace = 2;
    this.startButton = $('#gamebutton')
      .on('click', function() {

      var move = new MoveNote(0.25,"c4");

      $('#game').on('halftime',function(){

        var move = new MoveNote(0.25,"c5");


      })








      }.bind(this))









  }




}
