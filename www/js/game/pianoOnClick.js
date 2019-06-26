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
        case "csharpdflat4":
        var audio = new Audio('../../assets/wav/csharpdflat4.wav');
        audio.play();
        break;
        case "d4":
        var audio = new Audio('../../assets/wav/d4.wav');
        audio.play();
        break;
        case "dsharpeflat4":
        var audio = new Audio('../../assets/wav/dsharpeflat4.wav');
        audio.play();
        break;
        case "e4":
        var audio = new Audio('../../assets/wav/e4.wav');
        audio.play();
        break;
        case "f4":
        var audio = new Audio('../../assets/wav/f4.wav');
        audio.play();
        break;
        case "fsharpgflat4":
        var audio = new Audio('../../assets/wav/fsharpgflat4.wav');
        audio.play();
        break;
        case "g4":
        var audio = new Audio('../../assets/wav/g4.wav');
        audio.play();
        break;
        case "gsharpaflat4":
        var audio = new Audio('../../assets/wav/gsharpaflat4.wav');
        audio.play();
        break;
        case "a4":
        var audio = new Audio('../../assets/wav/a4.wav');
        audio.play();
        break;
        case "asharpbflat4":
        var audio = new Audio('../../assets/wav/asharpbflat4.wav');
        audio.play();
        break;
        case "h4":
        var audio = new Audio('../../assets/wav/h4.wav');
        audio.play();
        break;
        case "c5":
        var audio = new Audio('../../assets/wav/c5.wav');
        audio.play();
        break;
        case "csharpdflat5":
        var audio = new Audio('../../assets/wav/csharpdflat5.wav');
        audio.play();
        break;
        case "d5":
        var audio = new Audio('../../assets/wav/d5.wav');
        audio.play();
        break;
        case "dsharpeflat5":
        var audio = new Audio('../../assets/wav/dsharpeflat5.wav');
        audio.play();
        break;
        case "e5":
        var audio = new Audio('../../assets/wav/e5.wav');
        audio.play();
        break;
        case "f5":
        var audio = new Audio('../../assets/wav/f5.wav');
        audio.play();
        break;
        case "fsharpgflat5":
        var audio = new Audio('../../assets/wav/fsharpgflat5.wav');
        audio.play();
        break;
        case "g5":
        var audio = new Audio('../../assets/wav/g5.wav');
        audio.play();
        break;
        case "gsharpaflat5":
        var audio = new Audio('../../assets/wav/gsharpaflat5.wav');
        audio.play();
        break;
        case "a5":
        var audio = new Audio('../../assets/wav/a5.wav');
        audio.play();
        break;
        case "asharpbflat5":
        var audio = new Audio('../../assets/wav/asharpbflat5.wav');
        audio.play();
        break;
        case "h5":
        var audio = new Audio('../../assets/wav/h5.wav');
        audio.play();
        break;
        case "c6":
        var audio = new Audio('../../assets/wav/c6.wav');
        audio.play();
        break;


        default:

          console.log("fehler leider");
        break;
      }



    })

  }
}
