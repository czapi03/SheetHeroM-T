console.log('StartOnClick0');

class StartOnClick {
  constructor(notestoplay, pace, duration, finishline) {
    // this.pace = 2;
    this.startButton = $('#startbutton')
      .on('click', function() {
        // this.movenotes(function(){
        //   alert("test")
        // });
        // alert("test")
        var move = new MoveNote();
        console.log('StartOnClickbutton');







      }.bind(this))









  }

  // movenotes() {
  //   var zähler = this.pace;
  //   var _this = this;
  //   $('.note').css({
  //     display: "block"
  //   })
  //   setInterval(function() {
  //     _this.pace++;
  //
  //     if (_this.pace <= 66){
  //       console.log(_this.pace);
  //
  //       $('.note').css({
  //         right: "" + _this.pace + "%"
  //       })
  //     }else{
  //       clearInterval(console.log('quit'));
  //     }
  //
  //
  //
  //   }, 30);
  //
  // }


}
