console.log("--movenote--");

class MoveNote {
  constructor(speed, note) {
    this.speed = speed;
    this.note = note;
    this.position = 0;
    this.hit = false;
    this.colorhit = "#56ce46";
    this.colorfail = "#F80E0E";
    this.finishline = 66;
    this.position = 0;
    this.start = null;
    this.Req;


    this.clone = $('#n' + note).clone()
      .attr({

        'class': "cloned"

      });
    // this.moveMe();
    this.animate();


  }


  movemetheclone() {
    // var _this = this;
    // console.log(this);

    if(!this.start) this.start = Date.now();

    var progress = Date.now() - this.start;

    if (progress >= 20){
        this.position+=this.speed;

        this.clone.css({
          right: "" + this.position + "%"
        })
    }
    this.Req = window.requestAnimationFrame(this.movemetheclone.bind(this))

    if (this.position >= this.finishline && this.clone.hasClass("hitable")) {

      this.clone.removeClass('hitable');
      this.clone.find("*").attr("fill", "#F80E0E");

    }
    if (this.position >= 84) {

      window.cancelAnimationFrame(this.Req)
      this.clone.remove()

    }
  }

  animate(){
    this.clone.appendTo('#clones')
    this.clone.css({
      display: "block"
    })
    this.clone.addClass('hitable')
    console.log(this.note);
    return window.requestAnimationFrame(this.movemetheclone.bind(this))
  }









  // moveMe() {
  //   var _this = this;
  //   _this.clone.appendTo('#clones')
  //   _this.clone.css({
  //     display: "block"
  //   })
  //   _this.clone.addClass('hitable')
  //
  //
  //
  //   // var moveme = setInterval(function() {
  //   //   _this.position += _this.speed;
  //   //
  //   //
  //   //   if (_this.position >= _this.finishline && _this.clone.hasClass("hitable")) {
  //   //
  //   //     _this.clone.removeClass('hitable');
  //   //     _this.clone.find("*").attr("fill", "#F80E0E");
  //   //
  //   //   }
  //   //   if (_this.position >= 84) {
  //   //
  //   //     clearInterval(moveme);
  //   //     _this.clone.remove()
  //   //
  //   //   }
  //   //   _this.clone.css({
  //   //     right: "" + _this.position + "%"
  //   //
  //   //   })
  //   //   // console.log(_this.clone[0].style.right);
  //   //
  //   // }, 20);
  //
  //
  //
  //
  //
  // }

}
