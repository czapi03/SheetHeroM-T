console.log("movenotes");


var test = [
  "nc4",
  "nd4",
  "ng4"
]



class MoveNote {
  constructor(pace){
    this.pace = 0;
    this.moveMe();


  }


  moveMe(){
    var _this = this;

    var rnd = getRandomInt(test.length);
    console.log(rnd);


    var motor = setInterval(function () {
      // if(_this.pace <=66){

        _this.pace+=0.25;
      // }
      if(_this.pace ==66){
        clearInterval(motor)
      }
      $('#'+test[rnd]+'').css({
        display:"block",
         right: "" + _this.pace + "%"
      })

      if(_this.pace ==33){


      var motor2 = setInterval(function () {


        $('#'+test[2]+'').css({
          display:"block",
          right: "" + (_this.pace-33) + "%"
        })
        }, 20);

      }




    }, 20);

    console.log(_this.pace);


  }

}
