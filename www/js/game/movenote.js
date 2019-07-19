console.log("--movenote--");

class MoveNote {
  constructor(speed, note) {
    this.speed = speed;
    this.note = note;
    this.position = 0;
    this.hit = false;
    this.colorhit = "#56ce46";
    this.colorfail = "#F80E0E";
    this.finishline = $(window).width()*0.66;
    this.position = 0;
    this.start = null;
    this.Req;


    this.clone = $('#n' + note).clone()
      .attr({

        'class': "cloned"

      });
    // this.moveMe();
    this.moveMe();


  }


  movemetheclone() {
    // var _this = this;
    // console.log(this.speed);

    if(!this.start) this.start = Date.now();

    var progress = Date.now() - this.start;

    //if (progress >= 20){
        this.position += this.speed / 20 * progress;
        // console.log(this.position);

        this.clone.css({
          // CSS position
          // CSS transform translate-x
          // right: "" + this.position + "px"
          transform: "translate(-"+this.position+"px)"
        })

        this.start = Date.now();
    //}
    this.Req = window.requestAnimationFrame(this.movemetheclone.bind(this))

    if (this.position >= this.finishline && this.clone.hasClass("hitable")) {

      this.clone.removeClass('hitable');
      this.clone.find("*").attr("fill", "#F80E0E");

      // console.log(this.position);


    }
    if (this.position >= $(window).width()*0.8) {
      window.cancelAnimationFrame(this.Req)
      this.clone.remove()

    }
  }

  moveMe(){

    this.clone.appendTo('#clones')
    this.clone.css({
      display: "block"
    })
    this.clone.addClass('hitable')
    // console.log(this.note);
    return window.requestAnimationFrame(this.movemetheclone.bind(this))
  }













}
