class PianoOnClick {
  constructor(){
    this.allkeys = $('.pianoOnClick').on('click',function(){


      var mykey = $(this).attr('id');
      console.log(mykey);

      var audio = new Audio('../../assets/wav/'+ mykey +'.wav');
      audio.play();
      console.log(audio);



    })

  }
}
