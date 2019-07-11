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

      var highestNote = false

      $('.cloned').each(function(i, note /* == $('.cloned')[i] */ ) {



        if (highestNote == false || ($(note).get(0).style.right > $(highestNote).get(0).style.right && $(note).hasClass("hitable"))) {
          highestNote = note
        }

        
        highestNote.style.backgroundColor = "green"




        // console.log(highestNote);
        //   // handle highest note
        //
        //   // console.log(keyplayed);
        //   // console.log(highestNote.attr("id"));
        //   //
        //   // if (keyplayed == highestNote.attr("id") ) {
        //   //
        //   //   highestNote.css({background:"#56ce46"})
        //   //   // this.hit = true;
        //   //
        //   //   // this.clone.find("*").attr('fill', "green")
        //   // }
        // })

      })

    })
  }

  generatenewNote() {
    $('#game').on('halftime', function() {

      this.rndnote = getRandomInt(this.notestoplay.length);
      var move = new MoveNote(this.speed, this.notestoplay[this.rndnote]);


    }.bind(this))


  }


}
