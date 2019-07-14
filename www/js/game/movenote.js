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
    this.clone = $('#n' + note).clone()
      .attr({

        'class': "cloned"

      });

    this.moveMe();
  }






  moveMe() {
    var _this = this;
    _this.clone.appendTo('#clones')
    _this.clone.css({
      display: "block"
    })
    _this.clone.addClass('hitable')



    var moveme = setInterval(function() {
      _this.position += _this.speed;


      if (_this.position == 33) {
        $('#game').trigger('halftime')
      }
      if (_this.position == 66 && _this.clone.hasClass("hitable")) {

        _this.clone.removeClass('hitable');
        _this.clone.find("*").attr("fill", "#F80E0E");

      }
      if (_this.position == 84) {

        clearInterval(moveme);
        _this.clone.remove()

      }
      _this.clone.css({
        right: "" + _this.position + "%"

      })
      // console.log(_this.clone[0].style.right);

    }, 20);

  }

}
