console.log("movenotes");


var test = [
  "nc4",
  "nd4",
  "ne4",
  "nf4",
  "ng4",
  "na4",
  "nh4",
  "nc5",
  "nd5",
  "ne5",
  "nf5",
  "ng5",
  "na5",
  "nh5",
  "nc6",
]



class MoveNote {
  constructor(pace) {
    this.pace = 0;
    this.status = false;
    this.moveMe();


  }


  moveMe() {
    var _this = this;




      var rnd = getRandomInt(test.length);


      $('#' + test[rnd] + '').css({
        display: "block"
      })

      var motor = setInterval(function() {
        _this.pace += 0.25;



        if (_this.pace == 80) {
          clearInterval(motor)
          $('#' + test[rnd] + '').css({
            display: "none"
          })
        }
        $('#' + test[rnd] + '').css({
          right: "" + _this.pace + "%"
        })

        if (_this.pace == 33) {
          var moveNote = new MoveNote();
        }
        if (_this.pace == 66) {
          $('#' + test[rnd] + '').css({
            display: "block"
          })
        }

      }, 20);

      // console.log(_this.pace);


  }

}
