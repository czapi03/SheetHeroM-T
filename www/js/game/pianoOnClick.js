class PianoOnClick {
  constructor(){
    this.allkeys = $('.pianoOnClick').on('click',function(){


      var mykey = $(this).attr('id');
      console.log(mykey);

      switch(mykey){
        case "c4":
        var audio = new Audio('../../assets/wav/c4.wav');
        audio.play();
        break;
        default:

          console.log("fehler leider");
        break;
      }











    })

  }
}
